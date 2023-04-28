import react from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";

// form submit event

export default function Home() {
  const resultPerf = useRef();
  const resultTableMobile = useRef();
  const resultAcces = useRef();
  const resultAccesMobile = useRef();
  const resultBestPract = useRef();
  const resultBestPractMobile = useRef();
  const resultSeo = useRef();
  const resultSeoMobile = useRef();
  const tableauPageTest = useRef();
  const status = useRef();
  const error = useRef();
  const inputUrl = useRef();

  async function startCheck(e) {
    e.preventDefault();
    show(resultPerf, false);
    show(resultTableMobile, false);
    show(resultAcces, false);
    show(resultBestPractMobile, false);
    show(resultAccesMobile, false);
    show(resultBestPract, false);
    show(resultSeo, false);
    show(resultSeoMobile, false);
    show(tableauPageTest, false);
    show(status, true);
    show(error, false);

    const url = inputUrl.current.value;
    const form = e.target,
      fields = form.firstChild,
      apiURLDesktop =
        "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" +
        url +
        `&strategy=desktop&locale=fr-FR&hl=fr&category=accessibility&category=best-practices&category=seo&category=performance`;
    console.log(apiURLDesktop);
    const apiURLMobile =
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" +
      url +
      `&strategy=mobile&locale=fr-FR&hl=fr&category=accessibility&category=best-practices&category=seo&category=performance`;
    console.log(apiURLMobile);

    fields.disabled = true;

    try {
      // call API and get resultPerf
      const responseMobile = await fetch(apiURLMobile),
        resultPerfMobile = await responseMobile.json();
      const responseDesktop = await fetch(apiURLDesktop),
        resultPerfDesktop = await responseDesktop.json();
      // output resultPerf
      showResultMobile(resultPerfMobile);
      showResultDesktop(resultPerfDesktop);
      show(resultPerf);
      show(resultTableMobile);
      show(resultAcces);
      show(resultBestPractMobile);
      show(resultAccesMobile);
      show(resultBestPract);
      show(resultSeo);
      show(resultSeoMobile);
      show(tableauPageTest);
      show(status, false);
    } catch (err) {
      // API error
      console.log(err);
      show(status, false);
      show(error);
    }

    fields.disabled = false;
  }

  // populate resultPerf into table
  function showResultDesktop(resultPerfDesktop) {
    // Intl formatter
    const intlPc = new Intl.NumberFormat([], {
      style: "percent",
      minimumFractionDigits: 0,
    });

    // get output nodes
    Array.from(document.querySelectorAll("[data-point]")).forEach((node) => {
      // get value
      const data = node.dataset,
        v = getObjectValue(resultPerfDesktop, data.point.split("."));
      if (v >= 0 && v <= 1 && data.type !== "raw") {
        // output score
        node.textContent = intlPc.format(v);
        node.style.backgroundColor =
          v >= 0.9 ? "#9f9" : v >= 0.5 ? "#fc0" : "#f88";
      } else {
        // output another value
        node.textContent = v;
      }
    });
  }
  function showResultMobile(resultPerfMobile) {
    // Intl formatter
    const intlPc = new Intl.NumberFormat([], {
      style: "percent",
      minimumFractionDigits: 0,
    });

    // get output nodes
    Array.from(document.querySelectorAll("[data-pointMobile]")).forEach(
      (node) => {
        // get value
        const data = node.dataset,
          v = getObjectValue(resultPerfMobile, data.pointmobile.split("."));

        if (v >= 0 && v <= 1 && data.type !== "raw") {
          // output score
          node.textContent = intlPc.format(v);
          node.style.backgroundColor =
            v >= 0.9 ? "#9f9" : v >= 0.5 ? "#fc0" : "#f88";
        } else {
          // output another value
          node.textContent = v;
        }
      }
    );
  }
  // get nested property in an object
  function getObjectValue(obj, key) {
    const next = key.shift();
    if (next && obj.hasOwnProperty(next)) return getObjectValue(obj[next], key);
    else return obj;
  }
  // show or hide an element
  function show(node, active = true) {
    if (active) {
      node.current.classList.add("active");
    } else {
      node.current.classList.remove("active");
    }
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black h-screen z-1000 p-4 lg:p-0">
        <form
          id="pagespeed"
          action="https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
          method="get"
          className="max-w-2xl mx-auto text-center text-white"
        >
          <fieldset className="">
            <label className="block text-2xl font-semibold mb-4" htmlFor="url">
              Entrez l'url du site a tester
            </label>
            <div className="flex justify-center items-center">
              <input
                className="bg-gray-200 z-10 w-full h-10 pl-1 text-center text-black rounded-l-full"
                type="url"
                autoComplete="url"
                id="inputUrl"
                ref={inputUrl}
                name="url"
                placeholder="https://www.site.com/"
                size="40"
                required
              />

              <button
                onClick={startCheck}
                className="px-4 py-2 h-10 -ml-1 bg-blue-500 text-white rounded-r-full hover:bg-blue-700"
              >
                submit
              </button>
            </div>
          </fieldset>
          <div className="hidden text-white space-x-4 pt-4 ">
            <button className="border-b-2 border-blue-500 hover:text-blue-700">
              Mobile
            </button>
            <button className="hover:text-blue-700">Desktop</button>
          </div>
        </form>

        <h2
          className="text-white text-lg text-center pt-2"
          id="tableauPageTest"
          ref={tableauPageTest}
          data-point="id"
        ></h2>

        <div
          id="tableauDesktop"
          className="lg:flex lg:space-x-4 max-w-4xl mx-auto"
        >
          <table
            className="text-white border-2 lg:p-4 rounded border-white lg:w-1/4"
            id="resultPerf"
            ref={resultPerf}
          >
            <tbody>
              <tr className="w-full">
                <th className="w-full">Overall performance</th>
                <td
                  className="text-black "
                  data-point="lighthouseResult.categories.performance.score"
                ></td>
              </tr>
              <tr className="w-full">
                <th>Speed Index</th>
                <td
                  className="text-black"
                  data-point="lighthouseResult.audits.speed-index.score"
                ></td>
              </tr>
              <tr className="w-full">
                <th>First Contentful Paint</th>
                <td
                  className="text-black"
                  data-point="lighthouseResult.audits.first-contentful-paint.score"
                ></td>
              </tr>

              <tr className="w-full">
                <th>Largest Contentful Paint</th>
                <td
                  className="text-black"
                  data-point="lighthouseResult.audits.largest-contentful-paint.score"
                ></td>
              </tr>
              <tr className="w-full">
                <th>Cumulative Layout Shift</th>
                <td
                  className="text-black"
                  data-point="lighthouseResult.audits.cumulative-layout-shift.score"
                ></td>
              </tr>
              <tr className="w-full">
                <th>Total Blocking Time</th>
                <td
                  className="text-black"
                  data-point="lighthouseResult.audits.total-blocking-time.score"
                ></td>
              </tr>
            </tbody>
          </table>
          <table
            className="text-white border-2 lg:p-4 rounded border-white lg:w-1/4"
            id="resultAcces"
            ref={resultAcces}
          >
            <tbody>
              <tr className="flex flex-col justify-center items-center">
                <th className="w-full block">Overall Accessibilité</th>
                <td
                  className="text-black w-20 h-20 rounded-full text-center flex items-center justify-center"
                  data-point="lighthouseResult.categories.accessibility.score"
                ></td>
              </tr>
            </tbody>
          </table>
          <table
            className="text-white border-2 lg:p-4 rounded border-white lg:w-1/4"
            id="resultBestPract"
            ref={resultBestPract}
          >
            <tbody>
              <tr className="flex flex-col justify-center items-center">
                <th className="w-full block">Overall best practice</th>
                <td
                  className="text-black w-20 h-20 rounded-full text-center flex items-center justify-center"
                  data-point="lighthouseResult.categories.best-practices.score"
                ></td>
              </tr>
            </tbody>
          </table>
          <table
            className="text-white border-2 lg:p-4 rounded border-white lg:w-1/4"
            id="resultSeo"
            ref={resultSeo}
          >
            <tbody className="w-full">
              <tr className="flex flex-col justify-center items-center">
                <th className="w-full block ml-4">Overall SEO</th>
                <td
                  className="text-black w-20 h-20 ml-9 rounded-full text-center flex items-center justify-center"
                  data-point="lighthouseResult.categories.seo.score"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          id="tableauMobile"
          className="lg:flex lg:space-x-4 max-w-4xl mx-auto"
        >
          <table
            className="text-white border-2 lg:p-4 rounded border-white lg:w-1/4"
            id="resultPerfMobile"
            ref={resultTableMobile}
          >
            <tbody>
              <tr className="w-full">
                <th>Overall performance</th>
                <td
                  className="text-black "
                  data-pointmobile="lighthouseResult.categories.performance.score"
                ></td>
              </tr>
              <tr className="w-full">
                <th>Speed Index</th>
                <td
                  className="text-black"
                  data-pointmobile="lighthouseResult.audits.speed-index.score"
                ></td>
              </tr>
              <tr className="w-full">
                <th>First Contentful Paint</th>
                <td
                  className="text-black"
                  data-pointmobile="lighthouseResult.audits.first-contentful-paint.score"
                ></td>
              </tr>

              <tr className="w-full">
                <th>Largest Contentful Paint</th>
                <td
                  className="text-black"
                  data-pointmobile="lighthouseResult.audits.largest-contentful-paint.score"
                ></td>
              </tr>
              <tr className="w-full">
                <th>Cumulative Layout Shift</th>
                <td
                  className="text-black"
                  data-pointmobile="lighthouseResult.audits.cumulative-layout-shift.score"
                ></td>
              </tr>
              <tr className="w-full">
                <th>Total Blocking Time</th>
                <td
                  className="text-black"
                  data-pointmobile="lighthouseResult.audits.total-blocking-time.score"
                ></td>
              </tr>
            </tbody>
          </table>
          <table
            className="text-white border-2 lg:p-4 rounded border-white lg:w-1/4"
            id="resultAccesMobile"
            ref={resultAccesMobile}
          >
            <tbody>
              <tr className="flex flex-col justify-center items-center">
                <th className="w-full block">Overall Accessibilité</th>
                <td
                  className="text-black w-20 h-20 rounded-full text-center flex items-center justify-center"
                  data-pointmobile="lighthouseResult.categories.accessibility.score"
                ></td>
              </tr>
            </tbody>
          </table>
          <table
            className="text-white border-2 lg:p-4 rounded border-white lg:w-1/4"
            id="resultBestPractMobile"
            ref={resultBestPractMobile}
          >
            <tbody>
              <tr className="flex flex-col justify-center items-center">
                <th className="w-full block">Overall best practice</th>
                <td
                  className="text-black w-20 h-20 rounded-full text-center flex items-center justify-center"
                  data-pointmobile="lighthouseResult.categories.best-practices.score"
                ></td>
              </tr>
            </tbody>
          </table>
          <table
            className="text-white border-2 lg:p-4 rounded border-white lg:w-1/4"
            id="resultSeoMobile"
            ref={resultSeoMobile}
          >
            <tbody className="w-full">
              <tr className="flex flex-col justify-center items-center">
                <th className="w-full block ml-4">Overall SEO</th>
                <td
                  className="text-black w-20 h-20 ml-9 rounded-full text-center flex items-center justify-center"
                  data-pointmobile="lighthouseResult.categories.seo.score"
                ></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div ref={status} id="status">
          <div
            id="loader"
            className="fixed top-0 left-0 w-full h-full bg-opacity-75 bg-white z-50 flex justify-center items-center"
          >
            <svg
              className="animate-spin h-5 w-5 text-gray-500 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm0-16a8 8 0 018 8h4a12.01 12.01 0 00-3-8.062A11.952 11.952 0 0012 4z"
              ></path>
            </svg>
            <span className="text-gray-500">Chargement en cours...</span>
          </div>
        </div>
        <p ref={error} id="error">
          An error occurred when fetching the API.
        </p>
      </div>
    </>
  );
}