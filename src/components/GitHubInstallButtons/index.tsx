import React, { useState, useEffect } from "react";
import { RxGithubLogo } from "react-icons/rx";
import { VscVscode } from "react-icons/vsc";
import {
  GITHUB_MAIN_REPO_URL,
  VSCODE_MARKETPLACE_URL,
} from "@site/src/constants";
import styles from "./styles.module.css";

// Number formatting function
function formatNumber(num: number): string {
  const truncated = Math.floor((num / 1000) * 10) / 10;
  return truncated.toFixed(1) + "k";
}

// GitHub Stars API
async function getGitHubStars() {
  try {
    const url = "";
    const res = await fetch(url);
    const data = await res.json();

    if (typeof data.stargazers_count !== "number") {
      console.error("GitHub API: Invalid stargazers count");
      return null;
    }

    return formatNumber(data.stargazers_count);
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
    return null;
  }
}

// VS Code Downloads API
async function getVSCodeDownloads() {
  try {
    const url = "";
    const filterValue = "";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json;api-version=7.1-preview.1",
      },
      body: JSON.stringify({
        filters: [
          {
            criteria: [
              {
                filterType: 7,
                value: filterValue,
              },
            ],
          },
        ],
        flags: 914,
      }),
    });

    const data = await res.json();
    const statistics = data?.results?.[0]?.extensions?.[0]?.statistics;

    if (!statistics) {
      console.error("VSCode API: Missing statistics in response");
      return null;
    }

    const installStat = statistics.find(
      (stat: any) => stat.statisticName === "install"
    );
    if (!installStat) {
      console.error("VSCode API: Install count not found");
      return null;
    }

    return formatNumber(installStat.value);
  } catch (error) {
    console.error("Error fetching VSCode downloads:", error);
    return null;
  }
}

export default function GitHubInstallButtons(): JSX.Element {
  const [stars, setStars] = useState<string | null>("");
  const [downloads, setDownloads] = useState<string | null>("");

  useEffect(() => {
    // Fetch live data
    getGitHubStars().then((count) => {
      if (count) setStars(count);
    });

    getVSCodeDownloads().then((count) => {
      if (count) setDownloads(count);
    });
  }, []);

  return;

  // return (
  //   <div className={styles.container}>
  //     {/* GitHub Button */}
  //     <a
  //       href={GITHUB_MAIN_REPO_URL}
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       className={styles.githubButton}
  //       title="GitHub Repository"
  //     >
  //       <RxGithubLogo className={styles.icon} />
  //       {stars && <span>{stars}</span>}
  //     </a>

  //     {/* Install Button */}
  //     <a
  //       href={VSCODE_MARKETPLACE_URL}
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       className={styles.installButton}
  //       title="Install VS Code Extension"
  //     >
  //       <VscVscode className={styles.icon} />
  //       <span>
  //         Install <span className={styles.separator}>&middot;</span>
  //       </span>
  //       {downloads && <span>{downloads}</span>}
  //     </a>

  //   </div>
  // );
}
