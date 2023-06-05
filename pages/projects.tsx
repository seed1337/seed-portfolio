import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./projects.module.css";
import "../src/app/globals.css";
import ParticleBackground from "../components/Particle";

const Projects: React.FC = () => {
  const [repoData, setRepoData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await Promise.all([
          fetch("https://api.github.com/repos/seed1337/Python-Bluescreen"),
          fetch("https://api.github.com/repos/seed1337/Rakia-Moderation"),
          fetch("https://api.github.com/repos/seed1337/seed-portfolio"),
          fetch("https://api.github.com/repos/seed1337/sshbrute"),
          fetch("https://api.github.com/repos/seed1337/bypass-site"),
          fetch("https://api.github.com/repos/seed1337/XSS-SQL-TOOL-BASE"),
          
        ]);

        const data = await Promise.all(response.map((res) => res.json()));

        setRepoData(data);
      } catch (error) {
        console.error("Error fetching repository data:", error);
      }
    };

    fetchRepoData();
  }, []);

  const handleGoBack = () => {
    router.push("/"); // Navigate back to the enter screen
  };

  return (
    <div>
      <ParticleBackground />
      <h1 className={styles.pageTitle}>My Projects</h1>
      <div className={styles.container}>
        {repoData.map((repo, index) => (
          <div key={index} className={styles.card}>
            <h2 className={styles.cardTitle}>{repo.name}</h2>
            <p className={styles.cardDescription}>{repo.description}</p>
            <a href={repo.html_url} className={styles.cardLink}>
              View on GitHub
            </a>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={handleGoBack}>
        Back
      </button>
    </div>
  );
};

export default Projects;
