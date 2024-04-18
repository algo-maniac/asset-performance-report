import React, { useEffect, useRef, useState } from "react";
import "./ReportsPage.scss";
import SearchIcon from "./../../assets/images/search-bigiocn.svg";
import NoDataFoundIcon from "./../../assets/images/no-searchfound.png";
import ReactECharts from "echarts-for-react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { data } from "./data.js";
import Typewriter from "typewriter-effect";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useTheme } from "../../themeContext";

function useDebounce(value: any, delay: any) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

const LazyLoadedReportsPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currReport, setCurrReport] = useState("");
  const deviatingoverfds = useRef(null);
  const [changingValue, SetChangingValue] = useState(4);
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const [allReports, setAllReports] = useState<any>([
    "Asset deviating most from FDS (Over working)",
    "Asset deviating most from FDS (Under delivering from flow perspective)",
    "Assets working at peak condition",
    "Asset Behaviour Summary, top sub assets that get discussed the most",
    "Asset Behaviour Summary, top issues that get discussed the most",
    "Oscillation/ Vibration score for all Fans (Supply, Extract, Return)",
    "Assets operating In Hand",
    "Asset deviating most from FDS (Over working)",
    "Asset Behaviour Summary, top issues that get discussed the most",
    "Critical Assets - Urgent Attention Required",
  ]);
  const [copy, setCopy] = useState<any>([
    "Asset deviating most from FDS (Over working)",
    "Asset deviating most from FDS (Under delivering from flow perspective)",
    "Assets working at peak condition",
    "Asset Behaviour Summary, top sub assets that get discussed the most",
    "Asset Behaviour Summary, top issues that get discussed the most",
    "Oscillation/ Vibration score for all Fans (Supply, Extract, Return)",
    "Assets operating In Hand",
    "Asset deviating most from FDS (Over working)",
    "Asset Behaviour Summary, top issues that get discussed the most",
    "Critical Assets - Urgent Attention Required",
  ]);
  const [lastInd, setLastInd] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    console.log("Perform search with:", debouncedSearchTerm);
    console.log(copy);
    console.log(allReports);

    setAllReports(
      copy.filter((report: any) =>
        report.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    );
  }, [debouncedSearchTerm]);

  const handleReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
    let curr = 0;
    for (let i = 0; i < 20; i++) {
      if (allReports[i] == currReport) {
        curr = i;
        break;
      }
    }
    setOption((prevOption) => ({
      ...prevOption,
      series: prevOption.series.map((serie) => {
        if (serie.name === "FDS Value") {
          return {
            ...serie,
            data: data[curr].fds_value, // Replace newFDSValue1, newFDSValue2, ..., with your new data
          };
        } else if (serie.name === "Avg Value") {
          return {
            ...serie,
            data: data[curr].avg_value, // Replace newAvgValue1, newAvgValue2, ..., with your new data
          };
        } else if (serie.name === "% Diff") {
          return {
            ...serie,
            data: data[curr].diff_value, // Replace newDiffValue1, newDiffValue2, ..., with your new data
          };
        } else {
          return serie;
        }
      }),
    }));
    setOptionPie((prevOption) => ({
      ...prevOption,
      series: prevOption.series.map((serie) => {
        if (serie.name === "Access From") {
          return {
            ...serie,
            data: data[curr].lifecycle,
          };
        } else {
          return serie;
        }
      }),
    }));
  };

  const [option, setOption] = useState({
    grid: {
      show: false,
      z: 0,
      left: 30,
      top: 30,
      right: 40,
      bottom: 60,
      containLabel: false,
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    tooltip: {
      className: "tooltipCharts",
      trigger: "axis",
      borderWidth: 0,
      axisPointer: {
        type: "shadow",
      },
      textStyle: {
        fontSize: 11,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
      },
    },
    legend: {
      bottom: 0,
      orient: "horizontal",
      itemWidth: 11,
      itemHeight: 11,
      textStyle: {
        fontSize: 11,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 500,
        color: "#000000",
      },
      data: ["FDS Value", "Avg Value", "% Diff"],
    },
    xAxis: [
      {
        type: "category",
        data: [
          "AHU-01",
          "AHU-02",
          "AHU-03",
          "AHU-04",
          "AHU-05",
          "AHU-06",
          "AHU-07",
          "AHU-08",
          "AHU-09",
        ],
        axisLabel: {
          textStyle: {
            fontSize: 11,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#666666",
          },
          nameLocation: "start",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Avg Value",
        // min: 0,
        // max: 11,
        axisLabel: {
          // formatter: '{value} ml',
          textStyle: {
            fontSize: 11,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#666666",
          },
          nameLocation: "start",
        },
      },
      {
        type: "value",
        name: "% Diff",
        // min: 0,
        // max: 10,
        axisLabel: {
          formatter: "{value} %",
        },
      },
    ],
    series: [
      {
        name: "FDS Value",
        type: "bar",
        tooltip: {},
        data: [5, 6, 10, 3, 5, 9, 6, 2, 6],
        smooth: true,
        itemStyle: {
          color: "#0daeff",
          borderRadius: [0, 0, 0, 0],
          emphasis: {
            color: "#0daeff",
          },
        },
      },
      {
        name: "Avg Value",
        type: "bar",
        tooltip: {},
        data: [4, 2, 7, 5, 8, 4, 3, 4, 6],
        smooth: true,
        itemStyle: {
          color: "#25d589",
          emphasis: {
            color: "#25d589",
          },
        },
      },
      {
        name: "% Diff",
        type: "line",
        yAxisIndex: 1,
        tooltip: {},
        data: [5, 6, 3, 3, 5, 9, 6, 5, 2],
        smooth: true,
        itemStyle: {
          color: "#0052cc",
          borderRadius: [10, 10, 0, 0],
          emphasis: {
            color: "#0052cc",
          },
        },
      },
    ],
  });

  const [optionPie, setOptionPie] = useState({
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1, name: "SubAsset-01" },
          { value: 2, name: "SubAsset-02" },
          { value: 3, name: "SubAsset-03" },
          { value: 4, name: "SubAsset-04" },
          { value: 5, name: "SubAsset-05" },
          { value: 6, name: "SubAsset-06" },
          { value: 7, name: "SubAsset-07" },
          { value: 8, name: "SubAsset-08" },
          { value: 9, name: "SubAsset-09" },
        ],
      },
    ],
  });
  return (
    <div
      className="page-wrapper"
      style={
        theme === "dark" ? { background: "rgb(43 43 43)", width: "100vw" } : {}
      }
    >
      <section className="create-Report-Form-Header ps-4 pe-4 pb-4">
        <div className="page-title">
          <h1
            style={{
              marginBottom: "5px",
              display: "flex",
              // justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <span
              style={
                theme === "dark"
                  ? {
                      color: "white",
                      fontSize: "30px",
                      marginRight: "10px",
                    }
                  : { fontSize: "30px", marginRight: "10px" }
              }
            >
              Asset Performance Report
            </span>
            <ManageAccountsIcon
              style={
                theme === "dark"
                  ? {
                      color: "white",
                      fontSize: "30px",
                    }
                  : { fontSize: "30px" }
              }
            />
          </h1>
          <div
            className="typeWriterText"
            style={
              theme === "dark"
                ? {
                    color: "white",
                  }
                : { color: "green" }
            }
          >
            <Typewriter
              options={{
                strings: [
                  "Asset Performance Report provides comprehensive insights into your asset performance.",
                  "Get the best analysis of your assets with Asset Performance Report.",
                  "Receive detailed maintenance reports with Asset Performance Report.",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 10,
                delay: 40,
                wrapperClassName: "typeWriterText",
              }}
            />
          </div>
        </div>
        <div className="report-page-wrapper d-flex mt-4 section">
          <div className="col-lg-5 col-xl-4 col-xxl-4 container-opts">
            <div
              className="wrapper-in-con-opts p-4"
              style={
                theme === "dark"
                  ? { background: "rgb(18 18 18)", color: "white" }
                  : {}
              }
            >
              <div className="input-search-wrapper position-relative">
                <img
                  src={SearchIcon}
                  alt="image search"
                  className="position-absolute search-icon"
                  style={
                    theme === "dark"
                      ? { background: "rgb(93 93 93)", color: "white" }
                      : {}
                  }
                />
                <input
                  type="text"
                  className="input-seach w-100"
                  placeholder="Search ..."
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                  }}
                  style={
                    theme === "dark"
                      ? { background: "rgb(93 93 93)", color: "white" }
                      : {}
                  }
                />
              </div>
              {/* For No data Found */}
              <div className="d-flex align-items-center flex-column pt-5 pb-5 no-data">
                <img src={NoDataFoundIcon} alt="nodata" />
                <p className="mb-0 mt-4">No Data Found</p>
              </div>
              {/* For No data Found */}

              {allReports.length === 0 ? (
                <div>No data</div>
              ) : (
                <div className="asset-report-list d-flex flex-column mt-4">
                  {allReports.map((report: any, index: any) => (
                    <div className="indi-report-name d-flex mb-2" key={index}>
                      <span
                        className="w-100"
                        style={
                          theme === "dark"
                            ? { background: "rgb(43 43 43)", color: "white" }
                            : {}
                        }
                        onClick={() => {
                          setCurrReport(report);
                          handleReload();
                        }}
                      >
                        {report}
                      </span>
                    </div>
                  ))}
                  {lastInd != data.length ? (
                    <div className="indi-report-name d-flex mb-2">
                      <span
                        className="w-100"
                        style={
                          theme === "dark"
                            ? {
                                background: "rgb(43 43 43)",
                                color: "green",
                                fontWeight: "600",
                              }
                            : { color: "green", fontWeight: "600" }
                        }
                        onClick={() => {
                          const generateReportList = () => {
                            let list: any = [];
                            for (
                              let i = lastInd;
                              i < Math.min(data.length, lastInd + 10);
                              i++
                            ) {
                              setCopy((prev: any) => [...prev, data[i].name]);
                              setAllReports((prev: any) => [
                                ...prev,
                                data[i].name,
                              ]);
                            }
                            setLastInd(Math.min(data.length, lastInd + 10));
                          };
                          generateReportList();
                        }}
                      >
                        Load more...
                      </span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-7 col-xl-8 col-xxl-8 container-graph">
            <div
              className="wrapper-graph-report p-4"
              style={
                theme === "dark"
                  ? { background: "rgb(18 18 18)", color: "white" }
                  : {}
              }
            >
              <div
                className="wrapper-graph-section mb-5 d-flex flex-column"
                style={
                  theme === "dark"
                    ? {
                        background: "rgb(43 43 43)",
                        color: "white",
                        padding: "15px",
                      }
                    : { padding: "12px" }
                }
              >
                <p className="text-center">
                  {currReport ? currReport : allReports[0]}
                </p>
                <div
                  className="graph-wrapper"
                  key={reloadKey}
                  style={
                    theme === "dark"
                      ? {
                          background: "rgb(43 43 43)",
                          color: "white",
                        }
                      : {}
                  }
                >
                  <ReactECharts
                    option={option}
                    style={{ height: "100%", width: "100%" }}
                    className="graph-charts"
                  />
                  <div style={{ textAlign: "center", marginTop: "30px" }}>
                    LifeCycle
                  </div>
                  <ReactECharts
                    option={optionPie}
                    style={{ height: "100%", width: "100%" }}
                    className="graph-charts"
                  />
                </div>
              </div>
              <div className="text-insights-wrapper">
                <div
                  className="in-insi-wrapper"
                  style={
                    theme === "dark"
                      ? {
                          background: "rgb(43 43 43)",
                          color: "white",
                        }
                      : {}
                  }
                >
                  <p>
                    5 AHUs are working above FDS levels. Deviation range is from
                    11% to 22%. Potential increase in energy consumption would
                    be around 20%-30% as compared to FDS levels.
                    <br />
                    Only those assets have been listed where in the flow is
                    below or at FDS level.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LazyLoadedReportsPage;
