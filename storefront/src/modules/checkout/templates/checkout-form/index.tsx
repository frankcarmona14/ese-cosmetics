import { HttpTypes } from "@medusajs/types"

import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import Addresses from "@modules/checkout/components/addresses"
import Email from "@modules/checkout/components/email"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import { initiatePaymentSession, setShippingMethod } from "@lib/data/cart"

export default async function CheckoutForm({
  cart,
  customer,
  countryCode,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
  countryCode: string
}) {
  if (!cart) {
    return null
  }

  const shippingMethods = await listCartShippingMethods(cart.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")

  if (!shippingMethods || !paymentMethods) {
    return null
  }

  // const activeSession = cart.payment_collection?.payment_sessions?.find(
  //   (paymentSession: any) => paymentSession.status === "pending"
  // )

  // const selectedPaymentMethod = activeSession?.provider_id ?? "pp_system_default"

  // if (!activeSession) {
  //   await initiatePaymentSession(selectedPaymentMethod)
  // }

  return (
    <>
      <Email cart={cart} customer={customer} countryCode={countryCode} />
      <Addresses cart={cart} customer={customer} />
      {/* <Shipping cart={cart} availableShippingMethods={shippingMethods} />
      <Payment cart={cart} availablePaymentMethods={paymentMethods} /> */}
      <Review cart={cart} />
    </>
  )
}
