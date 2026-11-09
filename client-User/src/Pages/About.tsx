import { AuthorCard } from "../components/AuthorCard";
import { ToolBar } from "../components/ToolBar";
import { Em } from "@radix-ui/themes";

export function About() {
  return (
    <div>
      <div className="mb-4 flex w-full justify-center">
        <ToolBar def={"About"} />
      </div>

      <section className="prose prose-headings:text-green-700 dark:prose-invert prose-p:text-base sm:prose-p:text-xl prose-pre:max-h-120 mx-auto flex w-4/5 max-w-full flex-col bg-gray-200 p-4 leading-relaxed max-sm:w-full sm:p-6 dark:bg-gray-900 dark:text-white">
        <h1>Who writes these blogs?</h1>
        <div>
          <p>
            Hi, I'm Shriyash, a full-stack developer, and this is my blog
            platform,{" "}
            <span className="text-green-800 dark:text-green-600">
              <Em>&lt;Shriyash Uncompiled / &gt;</Em>
            </span>
            .
          </p>
          <AuthorCard />
          <p>
            As the name suggests, this is my platform to uncompile and share my
            thoughts, ideas, knowledge, experiments, life events, and the
            occasional tomfoolery. Cooking, code, and everything in between -
            mostly tech stuff, but not solely tech stuff.
          </p>
        </div>

        <p>
          I started writing about what I was learning on my full-stack
          development journey on Medium and LinkedIn. But once I ran into
          Medium's paywall blocking my own articles from readers, I had an itch
          to build a platform of my own. As luck would have it, working through
          The Odin Project gave me the perfect excuse to finally build it. If
          you have any suggestions about how my site is built, I'm all ears ;&#41;
        </p>
        <div>
          <h2>What am I doing currently?</h2>
          <p>
            I'm currently finishing my degree in computer science at the College
            of San Mateo, while staying open to new opportunities along the way.
            I'm hungry for exposure and would love to discuss any opportunities
            that come my way. For what I'm working on right now, check out my{" "}
            <a
              href="https://github.com/Shriyashzzz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-800 dark:text-green-600"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
