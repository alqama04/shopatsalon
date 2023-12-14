import { VscThumbsup } from "react-icons/vsc";
import { IoStorefrontOutline } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";
import { LiaMedalSolid } from "react-icons/lia";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiListChecksThin } from "react-icons/pi";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";

export const services = [
  {
    title: "Legitimacy",
    description:
      "Trust is everything. We guarantee 100% authenticity with original branded goods. Our commitment ensures zero risks of counterfeit products, safeguarding your salon's reputation and trust among your clients.",
      icon: VscThumbsup,
      iconColor: "#65B741",
  },
  {
    title: "All in One Place",
    description:
      "Simplify your sourcing. From skincare essentials to hair products, machines, tools, accessories, and disposable goods, we're your comprehensive salon solution. Finding everything you need in a single destination streamlines your operations and saves you valuable time.",
    icon: IoStorefrontOutline,
    iconColor: "#EF4040",
  },
  {
    title: "Good Margins",
    description:
      "Boost your profitability. We offer the best rates, ensuring you not only get quality products but also maximize your margins. Our competitive pricing empowers your business growth.",
    icon: BsGraphUp,
    iconColor: "#59CE8F",

  },
  {
    title: "Amazing Schemes & Rewards",
    description:
      "Elevate your benefits. Our annual target scheme goes beyond margins. It's designed to be achievable, offering additional perks and rewards that add value to your purchases effortlessly",
    icon: LiaMedalSolid,
    iconColor: "#FFB534",

  },
  {
    title: "Same Day & Next Day Delivery",
    description:
      "Time is of the essence. Enjoy prompt service with our same-day and next-day delivery options. We understand the urgency in the salon business and ensure you receive your orders swiftly.",
    icon: CiDeliveryTruck,
    iconColor: "#053bff",

  },
  {
    title: "Convenience",
    description:
      "Peace of mind is priceless. Say goodbye to worries about late deliveries or dealing with counterfeit products commonly faced with local market vendors. Joining us means a hassle-free experience, allowing you to focus on your clients and salon growth.",
    icon:FaListCheck,
    iconColor: "#F875AA",
    
  },
  {
    title: "Customer support",
    description:
      "Serving you is our priority. We provide our members with a dedicated Business Relationship Manager(BRM) for priority support and service.",
    icon: RiCustomerService2Line,
    iconColor: "#711DB0",

  },
];
