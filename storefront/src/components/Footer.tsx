// Components
import { Button, Icon, Layout, LayoutColumn, Link } from "./"
import { Input } from "./Forms"

export const Footer = () => {
  return (
    <div className="bg-grayscale-10 py-20">
      <Layout>
        <LayoutColumn className="col-span-13">
          <div className="flex justify-between gap-20 items-center">
            <div className="max-w-35 flex-1">
              <h1 className="text-xl mb-6 leading-[0.9]">Sofa Society Co.</h1>
              <p className="text-xs">&copy; 2024, Sofa Society</p>
            </div>
            <div className="flex gap-18 flex-1 justify-center">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="/">FAQ</Link>
                </li>
                <li>
                  <Link href="/">Help</Link>
                </li>
                <li>
                  <Link href="/">Delivery</Link>
                </li>
                <li>
                  <Link href="/">Returns</Link>
                </li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="/">Instagram</Link>
                </li>
                <li>
                  <Link href="/">TikTok</Link>
                </li>
                <li>
                  <Link href="/">Pinterest</Link>
                </li>
                <li>
                  <Link href="/">Facebook</Link>
                </li>
              </ul>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/">Cookie Policy</Link>
                </li>
                <li>
                  <Link href="/">Terms of Use</Link>
                </li>
              </ul>
            </div>
            <div className="flex-1 max-w-96">
              <h2 className="text-lg mb-4">Join our newsletter</h2>
              <p className="mb-4">
                We will also send you our discount coupons!
              </p>
              <Input
                type="email"
                placeholder="Your email"
                className="mb-4"
                iconName="arrow-right"
              />
              <p className="text-xs text-gray">
                By subscribing you agree to with our{" "}
                <Link href="/" variant="underline">
                  Privacy Policy
                </Link>{" "}
                and provide consent to receive updates from our company.
              </p>
            </div>
          </div>
        </LayoutColumn>
      </Layout>
    </div>
  )
}