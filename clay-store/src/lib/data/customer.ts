"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@lib/auth"
import {
  getAuthHeaders,
  getCacheOptions,
  getCacheTag,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken,
} from "./cookies"

export const retrieveCustomer = async (): Promise<HttpTypes.StoreCustomer | null> => {
  const authHeaders = await getAuthHeaders()
  let customer: HttpTypes.StoreCustomer | null = null

  if (authHeaders) {
    const next = { ...(await getCacheOptions("customers")) }
    customer = await sdk.client
      .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
        method: "GET",
        query: { fields: "*orders,*addresses" },
        headers: { ...authHeaders },
        next,
        cache: "force-cache",
      })
      .then(({ customer }) => customer)
      .catch(() => null)
  }

  if (customer) return customer

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (session?.user) {
      const names = session.user.name.split(" ")
      return {
        id: session.user.id,
        email: session.user.email,
        first_name: names[0] || "User",
        last_name: names.slice(1).join(" ") || "",
        has_account: true,
        created_at: session.user.createdAt,
        updated_at: session.user.updatedAt,
        phone: "",
        metadata: { source: "better-auth" },
        orders: [],
        addresses: [],
        shipping_addresses: []
      } as unknown as HttpTypes.StoreCustomer
    }
  } catch (error) { }

  return null
}

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = { ...(await getAuthHeaders()) }
  const updateRes = await sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError)

  const cacheTag = await getCacheTag("customers")
  revalidateTag(cacheTag)
  return updateRes
}

export async function signup(_currentState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const customerForm = {
    email: formData.get("email") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    phone: formData.get("phone") as string,
  }

  try {
    const token = await sdk.auth.register("customer", "emailpass", {
      email: customerForm.email,
      password: password,
    })
    await setAuthToken(token as string)
    const headers = { ...(await getAuthHeaders()) }
    const { customer: createdCustomer } = await sdk.store.customer.create(customerForm, {}, headers)
    const loginToken = await sdk.auth.login("customer", "emailpass", { email: customerForm.email, password })
    await setAuthToken(loginToken as string)
    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)
    await transferCart()
    return createdCustomer
  } catch (error: any) {
    return error.toString()
  }
}

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  try {
    await sdk.auth.login("customer", "emailpass", { email, password }).then(async (token) => {
      await setAuthToken(token as string)
      const customerCacheTag = await getCacheTag("customers")
      revalidateTag(customerCacheTag)
    })
    await transferCart()
  } catch (error: any) {
    return error.toString()
  }
}

export async function signout(countryCode: string) {
  await sdk.auth.logout()
  await removeAuthToken()
  const customerCacheTag = await getCacheTag("customers")
  revalidateTag(customerCacheTag)
  await removeCartId()
  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
  redirect(`/${countryCode}/account`)
}

export async function transferCart() {
  const cartId = await getCartId()
  if (!cartId) return
  const headers = await getAuthHeaders()
  await sdk.store.cart.transferCart(cartId, {}, headers)
  const cartCacheTag = await getCacheTag("carts")
  revalidateTag(cartCacheTag)
}

export const addCustomerAddress = async (currentState: Record<string, unknown>, formData: FormData): Promise<any> => {
  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    address_1: formData.get("address_1") as string,
    city: formData.get("city") as string,
    country_code: formData.get("country_code") as string,
    postal_code: formData.get("postal_code") as string,
    phone: formData.get("phone") as string,
  }
  const headers = { ...(await getAuthHeaders()) }
  return sdk.store.customer.createAddress(address, {}, headers).then(async () => {
    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)
    return { success: true, error: null }
  }).catch((err) => ({ success: false, error: err.toString() }))
}

export const deleteCustomerAddress = async (addressId: string): Promise<void> => {
  const headers = { ...(await getAuthHeaders()) }
  await sdk.store.customer.deleteAddress(addressId, headers).then(async () => {
    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)
  })
}

export const updateCustomerAddress = async (currentState: Record<string, unknown>, formData: FormData): Promise<any> => {
  const addressId = (currentState.addressId as string) || (formData.get("addressId") as string)
  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    address_1: formData.get("address_1") as string,
    city: formData.get("city") as string,
    country_code: formData.get("country_code") as string,
    postal_code: formData.get("postal_code") as string,
    phone: formData.get("phone") as string,
  }
  const headers = { ...(await getAuthHeaders()) }
  return sdk.store.customer.updateAddress(addressId, address, {}, headers).then(async () => {
    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)
    return { success: true, error: null }
  }).catch((err) => ({ success: false, error: err.toString() }))
}
