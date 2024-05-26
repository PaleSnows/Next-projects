import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";
import React from "react";

const FilteredNewsPage = async({ params }) => {
  /**
   * !params.filter will now hold an array of all the matched path segments
   * */
  const filter = params.filter;
  // getting the first element of filter array
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];
  let links =await getAvailableNewsYears();
  let newsContent = <p>No News found for the selected period!</p>;
  let news;

  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }


  const availableYears = await getAvailableNewsYears()
  if (
    (selectedYear && !availableYears.includes(selectedYear)) ||
    (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
  ) {
    throw new Error("Invalid filter.");
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
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
      {newsContent}
    </>
  );
};

export default FilteredNewsPage;
