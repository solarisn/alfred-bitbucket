const { compareDate, createService } = require('../utils');
const { getDefaultUsername, isBookmarked } = require('../config');

process.env.workspace = process.env.workspace || getDefaultUsername();
const workspace = process.env.workspace;

const url = (host) => {
    return host + 'repositories/' + workspace;
};

const map = ({ has_issues, name, full_name, slug }) => {
    const arg = [workspace, slug].join('/');
    const getTitle = () => [
        ((has_issues) ? '❗' : ''),
        ((isBookmarked(arg)) ? '🌟' : ''),
        name
    ].filter(title => !!title).join('');
    return {
        title: getTitle(),
        subtitle: full_name,
        arg
    };
};

const isRepoBookmarked = repo => isBookmarked([workspace, repo.slug].join('/'));

const sort = (first, second) => {
    if (isRepoBookmarked(first) && !isRepoBookmarked(second)) {
        return -1;
    }
    if (!isRepoBookmarked(first) && isRepoBookmarked(second)) {
        return 1;
    }
    return compareDate(first, second);
};

module.exports = createService({ url, map, sort });
