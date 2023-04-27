import { diceCoefficient, isPartOf } from '../string-compare.js';
import { repositories, GITHUB_ORG, environments } from '../constants.js';

export function parse_github_command(str) {
  switch (true) {
    case /^gh pr [\s\S]*/.test(str):
      return ['prs', str.substr(5).trim()];
    case /^gh mypr [\s\S]*/.test(str):
      return ['my_prs', str.substr(7).trim()];
    case /^gh dev [\s\S]*/.test(str):
      return ['develop_commits', str.substr(6).trim()];
    case /^gh wdf/.test(str):
      return ['wdf'];
    case /^gh tools/.test(str):
      return ['tools'];
    default:
      return ['home', str.substr(2).trim()];
  }
}

export function parse_devportal_command(str) {
  switch (true) {
    case /^dp ff [\s\S]*/.test(str):
      return ['ff', str.substr(5).trim()];
    case /^dp argo [\s\S]*/.test(str):
      return ['argo', str.substr(7).trim()];
    case /^dp deploy [\s\S]*/.test(str):
      return ['deploy', str.substr(9).trim()];
    default:
      return ['home'];
  }
}

function get_closest_match(search_str, collection, iteratee) {
  const filtered = collection.filter((it) =>
    isPartOf(search_str, iteratee(it))
  );

  const sorted = diceCoefficient
    .sortMatch(
      search_str,
      filtered.map((it) => iteratee(it))
    )
    .map((sorted) => collection.find((it) => iteratee(it) === sorted.member));
  return sorted[sorted.length - 1];
}

export function get_closest_repository(search_str) {
  return get_closest_match(search_str, repositories, (repo) => repo.name);
}

export function get_closest_environment(search_str) {
  return get_closest_match(search_str, environments, (env) => env.cluster);
}

export function get_repo_githuburl(repo) {
  const base_url =
    repo.org === GITHUB_ORG.WDF
      ? 'https://github.wdf.sap.corp/Eureka'
      : 'https://github.tools.sap/CIC';
  return `${base_url}/${repo.name}`;
}

export function get_jenkins_url(baseUrl, repo) {
  return repo.org === GITHUB_ORG.WDF
    ? `${baseUrl}/blue/organizations/jenkins/eureka-${repo.name}/activity`
    : `${baseUrl}/blue/pipelines/?search=${repo.name}`;
}
