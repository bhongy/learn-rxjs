import React from "react";
import { of } from "rxjs";
import { flatMap } from "rxjs/operators";
import "./Repositories.css";

const Repository = ({ name, url, language }) => (
  <p className="Repository">
    <a href={url} target="_blank">
      {name}
    </a>
    {language && <span className="Repository-language-tag">{language}</span>}
  </p>
);

const deserialize = repo => ({
  id: repo.id,
  name: repo.name,
  url: repo.html_url,
  language: repo.language
});

class Repositories extends React.Component {
  state = { repos: null };

  componentDidMount() {
    const req$ = of("https://api.github.com/users/bhongy/repos?sort=updated");
    req$
      .pipe(flatMap(reqUrl => fetch(reqUrl)), flatMap(res => res.json()))
      .subscribe(repos => {
        this.setState({ repos: repos.map(deserialize) });
      });
  }

  render() {
    const { repos } = this.state;
    return (
      <div>
        <h3>Repositories</h3>
        {repos &&
          repos.map(({ id, ...props }) => <Repository key={id} {...props} />)}
      </div>
    );
  }
}

export default Repositories;
