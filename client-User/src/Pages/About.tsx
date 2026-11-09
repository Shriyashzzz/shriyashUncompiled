import { AuthorCard } from "../components/AuthorCard";
import { ToolBar } from "../components/ToolBar";
import { Em } from "@radix-ui/themes";
import { NavLink } from "react-router";

export function About() {
  return (
    <div>
      <div className="mb-4 flex w-full justify-center">
        <ToolBar def={"About"} />
      </div>

      <section className="prose prose-headings:text-green-700 dark:prose-invert prose-p:text-base sm:prose-p:text-xl prose-h2:mt-12 prose-a:text-green-800 prose-a:underline-offset-4 dark:prose-a:text-green-500 mx-auto w-full max-w-3xl bg-gray-200 p-4 leading-relaxed selection:bg-green-200 sm:p-8 dark:bg-gray-900 dark:text-white dark:selection:bg-green-900">
        <h1>Who writes these blogs?</h1>
        <p>
          Hi, I'm Shriyash, a full-stack developer, CS student, and the one
          behind{" "}
          <span className="text-green-800 dark:text-green-600">
            <Em>&lt;Shriyash Uncompiled / &gt;</Em>
          </span>
          .
        </p>

        <AuthorCard className="not-prose my-8 gap-3" />

        <p>
          As the name suggests, this is where I uncompile and share my thoughts,
          ideas, knowledge, experiments, life events, and the occasional
          tomfoolery. Cooking, code, and everything in between: mostly tech
          stuff, but not solely tech stuff.
        </p>
        <p>
          Lately that's meant getting Switch games running natively on my iPad,
          turning the iPad Air I take uni notes on into a PS2 machine, and
          untangling sessions vs. JWTs for anyone who's learning backend like I
          am.
        </p>

        <h2>Why build my own?</h2>
        <p>
          I started out writing about my full-stack development journey on
          Medium and LinkedIn. But once I ran into Medium's paywall blocking my
          own articles from readers, I had an itch to build a platform of my
          own. As luck would have it, working through The Odin Project gave me
          the perfect excuse to finally build it.
        </p>
        <p>
          So I built it from scratch: React, TypeScript, Tailwind and Radix on
          the front; Express, Prisma and Postgres on the back; JWT auth; a
          separate admin app for managing posts; and a little email queue that
          sends out the newsletter. If you have any suggestions about how it's
          built, I'm{" "}
          <NavLink to="/feedback" viewTransition={true}>
            all ears
          </NavLink>{" "}
          ;&#41;
        </p>

        <h2>What am I doing currently?</h2>
        <p>
          I'm finishing my computer science degree at the College of San Mateo
          and staying open to new opportunities along the way. I'm hungry for
          exposure and always happy to talk about what comes my way.
        </p>
        <p>
          On the side, I'm building{" "}
          <a
            href="https://mangatracker.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Manga Tracker
          </a>
          , a site for keeping track of the manga I read: add a series, mark it
          finished, or bookmark the chapter I stopped on. For everything else
          I'm working on, check out my{" "}
          <a
            href="https://github.com/Shriyashzzz"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>

        <p>
          If you like my content, consider subscribing to my{" "}
          <NavLink to="/" viewTransition={true}>
            newsletter
          </NavLink>
          . Cheers!
        </p>
      </section>
    </div>
  );
}
