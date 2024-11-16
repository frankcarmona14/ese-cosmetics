"use client"
import { HttpTypes } from "@medusajs/types"

import PaymentDetails from "@modules/order/components/payment-details"
import { Layout, LayoutColumn } from "@/components/Layout"
import { LocalizedButtonLink } from "@/components/LocalizedLink"
import ItemsTemplate from "@modules/cart/templates/items"
import sendWhatsappMessage from "@lib/util/send-whatsapp-message"
import { useEffect, useState } from "react"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const [ sendedMessage, setSendedMessage ] = useState(false)

  const message = `Tu pedido ha sido realizado con éxito y será procesado en breve.Número de pedido #24${order.display_id}.
  
DATOS DEL CLIENTE

${order.shipping_address?.first_name} ${order.shipping_address?.last_name}
${order.shipping_address?.phone}
${order.shipping_address?.address_1}
${order.shipping_address?.city}

PRODUCTOS

${order.items?.map((item) => `${item.subtitle}"\n"${item.quantity}x ${item.unit_price} = ${item.total}`).join("\n")} 

PEDIDO GENERADO POR
----------------------------------
inversionesesecosmetics

LINK DEL PEDIDO
----------------------------------
https://vercatalogo.com/inversionesesecosmetics/view-order/invefkln9h3t27e`

  useEffect(() => {
    if (!sendedMessage) {
      sendWhatsappMessage(order.shipping_address?.phone || "", message)
      setSendedMessage(true)
    }
  }, [sendedMessage])

  return (
    <Layout className="pt-39 pb-36">
      <LayoutColumn
        start={{ base: 1, lg: 3, xl: 4 }}
        end={{ base: 13, lg: 11, xl: 10 }}
      >
        <h1 className="text-xl md:text-2xl mb-6 text-center">¡Gracias por tu pedido!</h1>
        <p className="mb-4">
          Nos complace confirmar que tu pedido ha sido realizado con éxito y será procesado en breve.
        </p>
        <p>
          Te hemos enviado los detalles del pedido a través de{" "}
          <strong>WhatsApp</strong>.<br />
          Tu número de pedido es <strong>#{order.display_id}</strong>.
        </p>
        <div className="flex flex-col sm:flex-row my-16 gap-8">
          <div className="flex-grow">
            <h2 className="font-semibold">Identificador</h2>
            <p className="text-grayscale-500">{order.id}</p>
            <br />
            <h2 className="font-semibold">Dirección de envío</h2>
            <p className="text-grayscale-500">
              {[
                order.shipping_address?.first_name,
                order.shipping_address?.last_name,
              ]
                .filter(Boolean)
                .join(" ")}
              <br />
              {[
                order.shipping_address?.address_1,
                [
                  order.shipping_address?.postal_code,
                  order.shipping_address?.city,
                ]
                  .filter(Boolean)
                  .join(" "),
                order.shipping_address?.country?.display_name,
              ]
                .filter(Boolean)
                .join(", ")}
              <br />
              {order.shipping_address?.phone}
            </p>
          </div>
        </div>
        <ItemsTemplate title="Productos" type="order" items={order.items} />

        <LocalizedButtonLink href="/" isFullWidth className="mt-16">
          Volver a la página principal
        </LocalizedButtonLink>
      </LayoutColumn>
    </Layout>
  )
}
