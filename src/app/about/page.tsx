import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'The most boring page on this website',
};

export default function Page() {
  return (
    <>
      <p>Hello! Thanks for stopping by my personal website.</p>

      <p>
        I&lsquo;m Matthew. A verteran software developer of over 10 years. I have experience in many
        industries, including marketing, manufacturing, payment processing &amp; commerce. I am a
        full stack developer and project manager. I sit and storyboard new product ideas, establish
        roadmaps for product delivery and develop solutions from the ground up.
      </p>

      <p>
        I am most familiar with PHP, however I am taking a dive into full stack
        Javascript(typescript) solutions. This website is made as a testament to that statement,
        using NextJS. The full source code is available to clone and use as your own if desired.
      </p>

      <p>
        My hobbies include programming(duh), working on cars & driving them, messing around with
        hardware and home automation, skateboarding & playing guitar & fishing.
      </p>

      <p>
        I am a father of two wonderful boys. My current car project is a 2022 Hyundai Veloster N
        with a Stage 2 tune pushing 300whp/320wtq. My current home automation project is a cat food
        dispenser with an app to automate or manually dispense the food. My current skateboard is an
        element. My current fishing rods are handme downs. I have three guitars, two ibanez, one
        acoustic, one electric and a epiphone les paul studio in alpine white.
      </p>

      <p>Thank you for visiting my website and reading my brief story.</p>

      <p>Best Regards,</p>
      <p>Matthew Javelet</p>
    </>
  );
}
