// our-domain.com/news/important-ths

import { useRouter } from "next/router";

function DetailPage() {
  const router = useRouter(); // return an object with methods we can use

  console.log(router.query.newsId); // the property holds the value of url dynamic parameter.

  const newsId = router.query.newsId;

  // send a request to the backend API
  // to fetch news item with newsId

  return <h1>The Detail Page</h1>;
}

export default DetailPage;
