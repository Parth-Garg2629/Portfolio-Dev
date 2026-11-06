import React, { useState, useEffect } from 'react';
import { GitFork, Star, Users, FolderGit2, ExternalLink, RefreshCw } from 'lucide-react';
import config from '../config';

function GitHubActivity() {
  const { githubUsername, githubUrl } = config.personal;
  const [userStats, setUserStats] = useState(null);
  const [topRepos, setTopRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setApiError(false);

    Promise.all([
      fetch(`https://api.github.com/users/${githubUsername}`).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      }),
      fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`).then((res) => {
        if (!res.ok) throw new Error('Failed to fetch repos');
        return res.json();
      })
    ])
      .then(([user, repos]) => {
        if (!isMounted) return;
        setUserStats({
          publicRepos: user.public_repos || 0,
          followers: user.followers || 0,
          following: user.following || 0
        });

        // Filter out forks or keep top 4 by stars
        const sorted = (Array.isArray(repos) ? repos : [])
          .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
          .slice(0, 4);

        setTopRepos(sorted);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('GitHub API error:', err);
        setApiError(true);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [githubUsername]);

  return (
    <section className="section" id="github-activity">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">05.</span>
          <h2 className="section-title">GitHub Activity</h2>
        </div>

        <p className="github-subtext reveal stagger-1">
          Open source contributions, public repositories, and live commit telemetry from GitHub.
        </p>

        {loading ? (
          <div className="github-loading-state reveal">
            <span className="terminal-prompt">&gt;</span>
            <span className="github-loading-text">Fetching GitHub data…</span>
          </div>
        ) : apiError ? (
          <div className="github-fallback-card reveal">
            <FolderGit2 size={32} className="github-fallback-icon" />
            <h3 className="github-fallback-title">GitHub Live Telemetry Offline</h3>
            <p className="github-fallback-desc">
              Rate limits or network restrictions prevented live telemetry from loading. You can explore all public repositories directly on GitHub.
            </p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: '16px' }}
            >
              <ExternalLink size={16} />
              View GitHub Profile (@{githubUsername})
            </a>
          </div>
        ) : (
          <div className="github-content reveal stagger-2">
            {/* User Stats Bar */}
            {userStats && (
              <div className="github-stats-bar">
                <div className="gh-stat-box">
                  <FolderGit2 size={20} className="gh-stat-icon" />
                  <div>
                    <span className="gh-stat-val">{userStats.publicRepos}</span>
                    <span className="gh-stat-lbl">Public Repositories</span>
                  </div>
                </div>
                <div className="gh-stat-box">
                  <Users size={20} className="gh-stat-icon" />
                  <div>
                    <span className="gh-stat-val">{userStats.followers}</span>
                    <span className="gh-stat-lbl">Followers</span>
                  </div>
                </div>
                <div className="gh-stat-box">
                  <GitFork size={20} className="gh-stat-icon" />
                  <div>
                    <span className="gh-stat-val">{userStats.following}</span>
                    <span className="gh-stat-lbl">Following</span>
                  </div>
                </div>
              </div>
            )}

            {/* Top 4 Repos Grid */}
            {topRepos.length > 0 && (
              <div className="github-repos-grid">
                {topRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gh-repo-card"
                  >
                    <div className="gh-repo-top">
                      <FolderGit2 size={16} className="gh-repo-icon" />
                      <span className="gh-repo-name">{repo.name}</span>
                      <ExternalLink size={14} className="gh-repo-ext" />
                    </div>
                    <p className="gh-repo-desc">
                      {repo.description || 'No description provided.'}
                    </p>
                    <div className="gh-repo-meta">
                      {repo.language && (
                        <span className="gh-repo-lang">
                          <span className="lang-dot" />
                          {repo.language}
                        </span>
                      )}
                      <span className="gh-repo-stat">
                        <Star size={13} /> {repo.stargazers_count}
                      </span>
                      <span className="gh-repo-stat">
                        <GitFork size={13} /> {repo.forks_count}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* Contribution Graph */}
            {!imgError && (
              <div className="github-chart-wrapper">
                <div className="github-chart-header">
                  <span className="chart-label">// Contribution Activity</span>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chart-link"
                  >
                    @{githubUsername} <ExternalLink size={12} />
                  </a>
                </div>
                <div className="github-chart-scroll">
                  <img
                    src={`https://ghchart.rshah.org/E8A33D/${githubUsername}`}
                    alt={`GitHub contributions chart for ${githubUsername}`}
                    className="github-chart-img"
                    onError={() => setImgError(true)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default GitHubActivity;
