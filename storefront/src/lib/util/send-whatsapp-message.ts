
const sendWhatsappMessage = async (number: string, text: string) => {
  const url = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? ""
  // const apiKey = process.env.NEXT_PUBLIC_WHATSAPP_API_KEY ?? ""

  const data = await fetch(url, { method: "POST", headers: {"Content-Type": "application/json" }, body: JSON.stringify({ number: number, text: text }) })
  const response = await data.json()
}

export default sendWhatsappMessage