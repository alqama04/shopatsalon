import React from "react";

const page = () => {
  const heading = "text-black font-semibold text-[1.2rem] tracking-wider";
  return (
    <div className="px-1 md:px-10 lg:px-12 xl:px-20">
      <div className="bg-white shadow-sm p-4">
        <h1 className={heading}>Privacy Policy</h1>
        <div className="my-5">
          <p>
            Thank you for using Shop At Salon. This Privacy Policy outlines how
            we handle your information when you use our services.
          </p>
        </div>
        <div className="mu-2">
          <h1 className={heading}>Information We Collect:</h1>

          <div className="my-2">
            <h2 className={`${heading}`}>Personal Information</h2>
            <li>
              Name, email,phone number, address, business name when you
              register.
            </li>
          </div>
        </div>
        <div className="my-2">
          <h2 className={`${heading}`}>Usage Information:</h2>
          <li>
            Automatically collected data like IP address, browser type, and
            device info.
          </li>
          <li>
            Use of cookies for enhanced user experience and tracking website
            usage.
          </li>
        </div>

        <h1 className={heading}>How We Use Your Information:</h1>

        <div className="my-2">
          <h2 className={`${heading}`}>Providing Services:</h2>
          <li>Manage your account,and provide access to purchase records.</li>
        </div>
        <div className="my-2">
          <h2 className={`${heading}`}>Communication:</h2>
          <li>Optionally, send promotional emails with your consent.</li>
        </div>
        <div className="my-2">
          <h2 className={`${heading}`}>Improving Services::</h2>
          <li>Analyze usage data to enhance website functionality.</li>
        </div>

        <h1>Sharing Your Information:</h1>

        <div className="my-2">
          <h2 className={`${heading}`}>Third-Party Service Providers:</h2>
          <li>
            Share information with service providers for website operation,
            transaction processing, and customer support.
          </li>
        </div>
        <div className="my-2">
          <h2 className={`${heading}`}>Legal Compliance:</h2>
          <li>
            Disclose information in response to legal requests or to comply with
            applicable laws.
          </li>
        </div>
        <h1>Your Choices:</h1>

        <div className="my-2">
          <h2 className={`${heading}`}>Account Information:</h2>
          <li>Review and update account details in your settings.</li>
        </div>
        <div className="my-2">
          <h2 className={`${heading}`}>Marketing Communications:</h2>
          <li>
            if you recieve promotional emails then you can Opt-out of
            promotional emails by following provided instructions or contacting
            us.
          </li>
        </div>
        <h2>Security:</h2>
        <p>
          Reasonable measures are taken to protect your information, though no
          method is 100% secure.
        </p>

        <div className="my-2">
          <h2 className={`${heading}`}>Changes to This Policy:</h2>
          <li>
            We may update this policy; material changes will be communicated.
          </li>
        </div>
        <div className="mt-4 mb-1">
          <h2 className={`${heading}`}>Contact Us:</h2>
          <li>Questions? Reach out to us at shopatsalon@gmail.com</li>
        </div>
        <p className="my-2">
          By using our services, you agree to this policy. If you disagree,
          please refrain from using our website.
        </p>
      </div>
    </div>
  );
};

export default page;
