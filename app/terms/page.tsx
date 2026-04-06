"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PageContainer } from "@/Components/ui/design-system";

export default function TermsPage() {
  return (
    <main className="bg-white pt-28 pb-20">
      <PageContainer>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-matter text-sm font-medium text-[#727272] transition-colors hover:text-[#141c35]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>

        <header className="mt-8">
          <p className="font-matter text-sm uppercase tracking-[0.22em] text-[#8b92a3]">
            Terms &amp; Conditions
          </p>
          <h1 className="mt-3 font-matter text-[clamp(2.5rem,5vw,4.2rem)] font-semibold tracking-[-0.05em] text-[#141c35]">
            KAN Terms and Conditions
          </h1>
        </header>

        <section className="mt-12 space-y-8 font-matter text-[1rem] leading-8 text-[#5f6f86]">
          <p>
            We are so glad you&apos;ve chosen to visit the KAN website, which is
            proudly owned and operated by Nepal Herbs Industries Pvt. Ltd.
            Before you dive into our world of skincare, we kindly ask that you
            take a moment to read through these terms of use. They outline the
            &quot;rules of the road&quot; for using our services, accessing our site, or
            interacting with the products offered by us and our trusted
            partners. From time to time, specific promotions or features might
            have their own extra rules, which we&apos;ll always point out as being
            part of this main document.
          </p>

          <p>
            By using our site, you&apos;re letting us know that you agree to these
            Terms of Service and our Privacy Policy. These rules also apply to
            any products you purchase through us. Because the world changes
            fast, we might update these terms occasionally by posting a new
            version here. Your continued use of the site after those updates
            means you&apos;re on board with the changes. Essentially, by accessing
            our content or buying our products, you&apos;re confirming that you
            understand and accept these terms as legally binding.
          </p>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Your Use of Our Site
            </h2>
            <p>
              We invite you to use the KAN site for your own personal,
              non-commercial enjoyment. Unless we&apos;ve given you written
              permission, please don&apos;t reproduce, copy, sell, or exploit any
              part of this site for business purposes. We also reserve the right
              to change or even take down parts of the site whenever we feel
              it&apos;s necessary.
            </p>
            <p>
              As long as you play by these rules, we grant you a limited,
              personal right to use our site&apos;s images, texts, graphics, sounds,
              and data. However, unless we explicitly say so, you cannot
              distribute, modify, or create &quot;spin-off&quot; works from our content.
              To keep KAN a safe space for everyone, you agree not to:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Post anything mean-spirited, abusive, or threatening that
                violates the privacy or rights of others.
              </li>
              <li>
                Pretend to be someone else, use a fake name, or provide
                misleading information.
              </li>
              <li>
                Try to &quot;hack&quot; the site or interfere with how other people enjoy
                the KAN experience.
              </li>
              <li>
                Do anything that breaks the laws of the jurisdiction where we
                operate.
              </li>
              <li>
                Upload anything fraudulent, obscene, or that steals someone
                else&apos;s intellectual property.
              </li>
              <li>
                Share trade secrets or confidential info that isn&apos;t yours.
              </li>
              <li>
                Engage in spamming or upload &quot;junk&quot; like viruses, worms, or
                trojans.
              </li>
              <li>
                Alter, translate, or adapt any part of our site without
                permission.
              </li>
              <li>Post nudity or adult content.</li>
              <li>
                Share photos of people who haven&apos;t given you permission to post
                them.
              </li>
              <li>Use the site to try and sell your own goods or services.</li>
              <li>
                Post malicious content, hate speech, or anything that incites
                violence.
              </li>
            </ul>
            <p>
              If these rules are broken, we have the right to step in and end
              your access to the site. Also, please note that while our site
              allows for communication, we aren&apos;t responsible for the content
              of those transmissions, and we reserve the right to limit the size
              or type of files being sent through our features.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Your Account
            </h2>
            <p>
              When you create an account with us, you&apos;ll be asked for some
              basic info and a password. We trust you to provide accurate,
              up-to-date information and to keep it that way. It is your
              responsibility to keep your login details a secret, please don&apos;t
              share your password with anyone else! You are responsible for
              everything that happens under your account name. If you ever think
              someone has broken into your account, please let us know
              immediately. KAN cannot be held responsible for any trouble that
              comes from someone else using your password.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Making a Purchase
            </h2>
            <p>
              Ready to treat your skin? When you buy something, we&apos;ll need some
              payment and shipping details. We handle this info with care, as
              explained in our Privacy Policy. You guarantee that any payment
              method you use belongs to you and that you have the legal right to
              use it. You also agree to protect KAN and our partners from any
              legal trouble related to your account or payments. Please remember
              that you are responsible for any relevant taxes on your purchase.
            </p>
            <p>
              We might change prices, descriptions, or product availability
              without giving notice. While we try our best to show the true
              colors of our products, every computer screen is a bit different,
              so we can&apos;t guarantee an exact color match. Also, just because a
              product is available today doesn&apos;t mean it will always be in
              stock. You are responsible for following your local and
              international laws regarding what you buy. We reserve the right to
              limit quantities, cancel orders, or refuse service to anyone. Once
              we ship your order, the &quot;risk of loss&quot; (responsibility for the
              package) moves to you.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Web Addresses (URLs)
            </h2>
            <p>
              Sometimes we might create special web pages for certain services.
              While we provide these, we don&apos;t own the permanent rights to
              specific URLs and can change or move them if we need to.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Third-Party Services
            </h2>
            <p>
              You might find links on our site that lead to other websites or
              software. Since we don&apos;t run those sites, we can&apos;t be responsible
              for what they say or do. We highly recommend reading their own
              terms and privacy policies before you share any info with them.
              Using those third-party sites is at your own risk.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              User Submitted Materials
            </h2>
            <p>
              If you send us photos, text, or videos (like a review or a contest
              entry), here is how we handle it:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                You still own your content, but you give KAN a permanent,
                worldwide right to use, copy, and display it, especially to
                fulfill a service you&apos;ve requested (like putting a photo on a
                custom product).
              </li>
              <li>
                If you use our templates or layouts to organize your photos, we
                own the rights to that layout, even if you own the photos inside
                it.
              </li>
              <li>
                You promise that you have the right to share the material and
                that it doesn&apos;t steal anyone else&apos;s ideas.
              </li>
              <li>
                You promise that anyone appearing in your photos has given their
                permission (or a parent has, if they are under 16).
              </li>
              <li>
                We have the right (but not the requirement) to edit or remove
                any content we think is inflammatory or inappropriate.
              </li>
              <li>
                You agree to protect KAN from any legal claims that arise
                because of the content you submitted.
              </li>
            </ul>
            <p>
              We can remove content that breaks these rules, but we aren&apos;t
              required to monitor every single post. It&apos;s always a good idea to
              keep your own backups of your photos and files!
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Dealing with Offensive Material
            </h2>
            <p>
              If you see something on our site that you think is illegal or
              deeply offensive, please tell us. We will do our best to review it
              and remove it in a reasonable amount of time.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Copyright &amp; Ownership
            </h2>
            <p>
              Everything you see on this site, from the logos and text to the
              software, belongs to KAN or our partners. It&apos;s protected by the
              laws of Nepal and international copyright rules. Please don&apos;t use
              &quot;data mining&quot; tools or &quot;robots&quot; to scrape information from our
              site, and don&apos;t try to republish our product listings or prices
              without our written consent.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Comments and Feedback
            </h2>
            <p>
              We love hearing from you! Whether we ask for it or you just want
              to share an idea, anything you send us (suggestions, plans,
              proposals) can be used by KAN without any restriction or payment
              to you. We aren&apos;t required to keep comments confidential or
              respond to every one. You promise your comments won&apos;t be mean,
              illegal, or full of viruses. You are responsible for the words you
              share.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Our Responsibility (Limitation of Liability)
            </h2>
            <p>
              We work hard to keep KAN running smoothly, but we aren&apos;t
              responsible if the site is slow, if there&apos;s a transmission error,
              or if &quot;Force Majeure&quot; (things outside our control) happens. We
              provide the site &quot;AS IS.&quot; This means we don&apos;t make big promises
              that the site will always be perfect, virus-free, or exactly what
              you need. To the extent the law allows, KAN isn&apos;t liable for any
              damages (like lost profits or computer issues) that come from
              using the site. By using KAN, you agree to protect us from any
              claims arising from your use of the site.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Submitting Ideas
            </h2>
            <p>
              If you send us an idea for a new product, it becomes KAN&apos;s
              property. This helps us avoid any confusion if we were already
              working on a similar idea. If you want to keep ownership of an
              idea, please don&apos;t send it to us without a prior written
              agreement.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Force Majeure
            </h2>
            <p>
              If something completely outside our control happens (like a
              natural disaster or major network failure) and we can&apos;t fulfill
              our duties, we won&apos;t be held liable for the delay.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Communication
            </h2>
            <p>
              When you email us or place an order, you&apos;re communicating with us
              electronically. You agree that we can reach out to you via email,
              SMS, or phone calls regarding your orders or updates.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Legal Jurisdiction
            </h2>
            <p>
              KAN is based in Nepal. These terms are governed by the laws of
              Nepal, and any legal disagreements will be handled by the courts
              in Kathmandu.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Termination
            </h2>
            <p>
              Either of us can end this relationship at any time. If you break
              these rules, we might close your account immediately. Once an
              account is closed, your right to use the site stops, and we may
              delete any files or materials associated with your account.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Cash on Delivery (COD)
            </h2>
            <p>
              For our local customers, we offer COD. You can pay in cash
              (Nepali Rupees only) at the time of delivery. We can&apos;t accept
              cheques or drafts for this. Please note that COD isn&apos;t available
              for every single location in Nepal yet, you can check your pin
              code at checkout.
            </p>
            <p>
              If you need to exchange something, it must be in perfect,
              saleable condition with tags attached.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>KAN will inspect all returns.</li>
              <li>
                We can&apos;t accept returns for items damaged by misuse or
                improper care.
              </li>
              <li>Shipping charges are non-refundable.</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Returns &amp; Exchanges
            </h2>
            <p>
              To process a return, we require an unboxing video sent to our
              email or phone. We can&apos;t accept returns if:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>The product was damaged by you after unboxing.</li>
              <li>
                The original packaging, tags, or free samples are missing.
              </li>
              <li>The serial number has been tampered with.</li>
              <li>
                The product was a &quot;latent defect&quot; item not covered by warranty.
              </li>
              <li>The product has been used or altered.</li>
              <li>It&apos;s been more than 7 days since delivery.</li>
              <li>The item was bought on a &quot;final sale&quot; offer.</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Product Disclaimer
            </h2>
            <p>
              Color Cosmetic is personal! If you experience any irritation or
              reaction, please stop using the product immediately and talk to a
              doctor. Also, note that sale items might have a shorter shelf life
              (between 3 to 6 months).
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Pricing and Availability
            </h2>
            <p>
              We try our best to be accurate, but sometimes mistakes happen with
              prices or descriptions. We don&apos;t &quot;officially&quot; accept your order
              until it&apos;s dispatched. If we catch a pricing error, we&apos;ll contact
              you or cancel the order. If we&apos;ve already charged you and then
              have to cancel, we will refund you in full.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-matter text-[1.7rem] font-semibold tracking-[-0.04em] text-[#141c35]">
              Changes to These Terms
            </h2>
            <p>
              You can always find the most current version of these terms right
              here. We might update them to reflect new tools or features, so
              feel free to check back whenever you visit.
            </p>
          </article>
        </section>
      </PageContainer>
    </main>
  );
}
