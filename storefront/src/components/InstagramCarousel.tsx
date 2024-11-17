import { CarouselSwiper } from "./CarouselSwiper"
import { Layout, LayoutColumn } from "./Layout";

interface CarouselItem {
  type: "video" | "image";
  src: string;
  url: string;
  alt: string;
}

const media: CarouselItem[] = [
  {
    "type": "video", "src": "https://scontent-ham3-1.cdninstagram.com/o1/v/t16/f1/m86/954A9E89253BD8EDF4DBFE39D203689E_video_dashinit.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuNzIwLmJhc2VsaW5lIn0&_nc_cat=106&vs=869535715113667_1626412117&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC85NTRBOUU4OTI1M0JEOEVERjREQkZFMzlEMjAzNjg5RV92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dESlRWUnRtSkpLY1l1RUdBSUx4VHpwWjFKMFlicV9FQUFBRhUCAsgBACgAGAAbABUAACbW8vql5LPIPxUCKAJDMywXQEVmZmZmZmYYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HAA%3D%3D&_nc_rid=02f27a9dd6&ccb=9-4&oh=00_AYCROOQtS5NvxxN_t243eGxRtth3Nggs7VCLFbInlkkmrA&oe=66DE35B0&_nc_sid=10d13b", "url": "https://www.instagram.com/p/C_mILLOtMtM/", "alt": "Reel 1"
  },
  {
    "type": "image", "src": "./assets/img/img1.jpg", "url": "https://www.instagram.com/p/C_jdIcXuk_-/", "alt": "Foto 1"
  },
  {
    "type": "video", "src": "https://scontent.cdninstagram.com/o1/v/t16/f1/m86/50446951C210440C549E6FC98C017287_video_dashinit.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuNzIwLmJhc2VsaW5lIn0&_nc_cat=106&vs=7342908805812214_155334736&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC81MDQ0Njk1MUMyMTA0NDBDNTQ5RTZGQzk4QzAxNzI4N192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dHaDFVaHVmc29sMzB3d2dBUGxzcl9YcjRwRnJicV9FQUFBRhUCAsgBACgAGAAbABUAACb0lLz6j7ONQBUCKAJDMywXQDaQ5WBBiTcYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HAA%3D%3D&_nc_rid=2ed61d86b3&ccb=9-4&oh=00_AYDWoxnvpXI41_E8VfLhNoQ-qBKa4Qgc-lDeYHMezokfCA&oe=66DE5FB8&_nc_sid=10d13b", "url": "https://www.instagram.com/p/C_gXOGjOzmg/", "alt": "Reel 2"
  },
  {
    "type": "image", "src": "./assets/img/img2.jpg", "url": "https://www.instagram.com/p/C_jctgOOfQL/?img_index=1", "alt": "Foto 2"
  },
  {
    "type": "image", "src": "./assets/img/img3.jpg", "url": "https://www.instagram.com/p/C_jclJhuYdy/?img_index=1", "alt": "Foto 3"
  },
  {
    "type": "video", "src": "https://scontent.cdninstagram.com/o1/v/t16/f2/m69/An-V8ME8dYgehar0mihQinFAJ4smDl1exKYlKpSynC0sdv3Rzx1w-scPhm6tcRIWwW9mkml6lS76501052GX8wDT.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2Fyb3VzZWxfaXRlbS5jMi43MjAuYmFzZWxpbmUifQ&_nc_cat=107&vs=558293546860617_3624538237&_nc_vs=HBkcFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HT3Q1VHh0bVdGOEotVkVJQUpkU3hxNkdEOUFDYmtZTEFBQUYVAALIAQAoABgAGwAVAAAm9Mjf3%2BqdkkAVAigCQzMsF0AjIcrAgxJvGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHXuBwA%3D&_nc_rid=d99ed4235c&ccb=9-4&oh=00_AYAKE6XivN-8ONVzr__muJ8DWANTVLCJe9HMOsBxOol3dQ&oe=66DE8642&_nc_sid=10d13b", "url": "https://www.instagram.com/p/C_btMLCuHID/?img_index=1", "alt": "Reel 3"
  },
  {
    "type": "image", "src": "./assets/img/img4.jpg", "url": "https://www.instagram.com/p/C_bs3OPOudr/?img_index=1", "alt": "Foto 4"
  },
  {
    "type": "video", "src": "https://scontent.cdninstagram.com/o1/v/t16/f2/m69/An9u3rV3DnBixw2K7ocBQ0NwMdaKpTr7Ykv-W7dDq2GibJq2jWW44y7lsDL-OvVbcCiWfe-3RpudZa37qkYpblw.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuMTA4MC5iYXNlbGluZSJ9&_nc_cat=104&vs=1865076624017422_3587863022&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HTElZaHhMZTFlT0FSOFFDQUtWa1drOGF0ZW9jYnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dQVEFUUnZjZXZhMlV1c01BTDA5WXYxWnRiTklia1lMQUFBRhUCAsgBACgAGAAbABUAACaYtPafqurBPxUCKAJDMywXQDnEGJN0vGoYFmRhc2hfYmFzZWxpbmVfMTA4MHBfdjERAHX%2BBwA%3D&_nc_rid=980d7ffddc&ccb=9-4&oh=00_AYBwxh8wuEuSFAEJJDNRgleK1DxfT6TuPR1ZsG-_79rnrg&oe=66DE7277&_nc_sid=10d13b", "url": "https://www.instagram.com/p/C_bsiU0OQ5X/", "alt": "Reel 4"
  },
  {
    "type": "video", "src": "https://scontent.cdninstagram.com/o1/v/t16/f2/m69/An_kSJptBtAS3UeeoNLOA_cvKvphNab-yn3cnx-X6f2WwJv8AFs-3wTJsSRbmr5FTkZQDend_QfMVl8pur7VtDmq.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2Fyb3VzZWxfaXRlbS5jMi4xMDgwLmJhc2VsaW5lIn0&_nc_cat=110&vs=1035636244349943_1407435983&_nc_vs=HBkcFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HRFVsTmdlcC1uaXFXWVFCQU1DYk5DREJJREZIYnBSMUFBQUYVAALIAQAoABgAGwAVAAAm%2Fr6RveT24D8VAigCQzMsF0ATEGJN0vGqGBZkYXNoX2Jhc2VsaW5lXzEwODBwX3YxEQB17gcA&_nc_rid=8d95650d85&ccb=9-4&oh=00_AYDeXdmqls1aY7Bd8_hIutXpf1OfSLZvmEZjvLJ8xoC0hw&oe=66DE79B9&_nc_sid=10d13b", "url": "https://www.instagram.com/p/C_bsiU0OQ5X/", "alt": "Reel 5"
  },
  {
    "type": "image", "src": "./assets/img/img5.jpg", "url": "https://www.instagram.com/p/C_Tsp11u2X0/?img_index=1", "alt": "Foto 5"
  },
  {
    "type": "video", "src": "https://scontent-ham3-1.cdninstagram.com/o1/v/t16/f2/m69/An8g1vwsD3nvEg0RT7mo433A1YlhDvgWygyZjeyTob1_23IrevN1HeBJIRQk77SHT4uOhcaSCc_7myJhbY1P.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuMTA4MC5iYXNlbGluZSJ9&_nc_cat=102&vs=8596838963683777_1548454504&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HR0NINnhMZEpTMklmdGtCQVBvOTNvYXRjR29uYnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dLWjlOeHRIZDFCUDFsY0JBREtYR0R5ckNsbzFicV9FQUFBRhUCAsgBACgAGAAbABUAACaQpvCknJWEQBUCKAJDMywXQD0Q5WBBiTcYFmRhc2hfYmFzZWxpbmVfMTA4MHBfdjERAHX%2BBwA%3D&_nc_rid=c85b1ebfd0&ccb=9-4&oh=00_AYAU7S6ztopWLJRb5TnCPVCFcwDuzVCPHIW5SK1AUIK5tw&oe=66DEA121&_nc_sid=10d13b", "url": "https://www.instagram.com/p/C_CJmk6N9bc/", "alt": "Reel 6"
  },
  {
    "type": "image", "src": "./assets/img/img6.jpg", "url": "https://www.instagram.com/p/C_RX3FSOtCt/?img_index=1", "alt": "Foto 6"
  }
]

// const token = 'YOUR_ACCESS_TOKEN';
// const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`;

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data); // Aquí obtienes tus publicaciones
//     // Renderiza las publicaciones en tu página
//   })
//   .catch((error) => console.error('Error fetching Instagram posts:', error));

interface InstagramCarouselProps {}

const InstagramCarousel: React.FC<InstagramCarouselProps> = () => {
  return (
    <Layout className="pt-16">
      <LayoutColumn>
        <h3 className="text-lg md:text-2xl mb-16 text-grayscale-600">Síguenos en Instagram</h3>
        <CarouselSwiper items={media} hiddenClasses="hidden lg:block" slidesPerGroup={4} slidesPerView={4} />
        <CarouselSwiper items={media} hiddenClasses="hidden md:block lg:hidden" slidesPerGroup={3} slidesPerView={3} />
        <CarouselSwiper items={media} hiddenClasses="block md:hidden" slidesPerGroup={2} slidesPerView={2} />
      </LayoutColumn>
    </Layout>
  );
};

export default InstagramCarousel;