const { compareDate, createService } = require('../utils');
const isDefault = require('../config').isDefault;

const url = host => `${host}workspaces/`;

const map = ({ type, name, slug }) => {
    const getIcon = () => {
        switch (type) {
            case 'user':
                return '👤';
            default:
                return '👥';
        }
    };
    const getTitle = () => [
        getIcon(),
        (isDefault(slug)) ? '🌟' : '',
        name
    ].filter(emoji => !!emoji).join('');
    return {
        title: getTitle(),
        subtitle: slug,
        arg: slug
    };
};

const isUserDefault = user => isDefault(user.username);

const sort = (first, second) => {
    if (isUserDefault(first) && !isUserDefault(second)) {
        return -1;
    }
    if (!isUserDefault(first) && isUserDefault(second)) {
        return 1;
    }
    return compareDate(first, second);
};

module.exports = createService({ url, map, sort });
