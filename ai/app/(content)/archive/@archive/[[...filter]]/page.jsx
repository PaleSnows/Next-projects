import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";
import React, { Suspense } from "react";


async function FilterHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();
  let links = availableYears;
  if (
    (year && !availableYears.includes(year)) ||
    (month &&
      !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error("Invalid filter.");
  }
  if (year && !month) {
    links = getAvailableNewsMonths(year);
  }
  if (year && month) {
    links = [];
  }
  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => {
            const href = year
              ? `/archive/${year}/${link}`
              : `/archive/${link}`;
            return (
              <li key={link}>
                <Link href={href}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}


async function FilteredNews({ year, month }) {
  let news;
  if (year && !month) news = await getNewsForYear(year);
  else if (year && month) news = await getNewsForYearAndMonth(year, month);
  let newsContent = <p>No News found for the selected period!</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }
  return newsContent;
}


const FilteredNewsPage = async ({ params }) => {
  /**
   * !params.filter will now hold an array of all the matched path segments
   * */
  const filter = params.filter;
  // getting the first element of filter array
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  return (
    <>
    {/* suspense an more granular alternative to loading.js */}
      <Suspense fallback={<p>Loading filter...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth} />
      </Suspense>
      <Suspense fallback={<p>Loading news...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth} />
      </Suspense>
    </>
  );
};


export default FilteredNewsPage;
