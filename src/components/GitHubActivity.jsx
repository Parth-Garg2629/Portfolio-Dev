import React, { useState, useEffect } from 'react';
import config from '../config';

function GitHubActivity() {
  const { githubUsername, githubUrl } = config.personal;
  const [userStats, setUserStats] = useState(null);
  const [topRepos, setTopRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

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
          followers: user.followers || 0
        });

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

        <p className="section-intro reveal">
          Public telemetry and repositories from @{githubUsername}.
        </p>

        {loading ? (
          <div className="github-loading-state reveal">
            <span className="terminal-prompt">&gt;</span> Fetching GitHub data…
          </div>
        ) : apiError ? (
          <div className="github-fallback-line reveal">
            <span>Unable to load GitHub stats.</span>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-mono"
            >
              View Profile ↗
            </a>
          </div>
        ) : (
          <div className="github-content reveal">
            {/* One mono line for counts */}
            {userStats && (
              <div className="github-counts-line">
                <span className="github-count-text">
                  {userStats.publicRepos} public repos &middot; {userStats.followers} followers
                </span>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-mono"
                >
                  github.com/{githubUsername} ↗
                </a>
              </div>
            )}

            {/* Top Repos as List Rows */}
            {topRepos.length > 0 && (
              <div className="project-rows-table">
                {topRepos.map((repo) => (
                  <div className="project-list-row" key={repo.id}>
                    <div className="project-row-date">
                      {repo.language || 'Code'}
                    </div>
                    <div className="project-row-body">
                      <h4 className="project-row-title">{repo.name}</h4>
                      <p className="project-row-desc">
                        {repo.description || 'Public repository.'}
                      </p>
                      <div className="project-row-tags">
                        <span className="tag-mono">{repo.stargazers_count} stars</span>
                        <span className="tag-mono">{repo.forks_count} forks</span>
                      </div>
                    </div>
                    <div className="project-row-links">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-mono"
                      >
                        Repo ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default GitHubActivity;
