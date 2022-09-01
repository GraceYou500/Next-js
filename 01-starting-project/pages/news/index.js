// our-domain.com/news
import Link from "next/link";

import { Fragment } from "react";

function NewsPage() {
  return (
    <Fragment>
      <h1>The News Page</h1>;
      <ul>
        <li>
          <Link href="/news/next-js-is-a-framework">
            Next Js Is a Great Framework
          </Link>
        </li>
        <li>
          <a href="/news/learning-it-need-patients">
            Learning IT is pation need
          </a>
        </li>
      </ul>
    </Fragment>
  );
}

export default NewsPage;
