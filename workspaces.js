const alfy = require('alfy');
const authenticate = require('./authenticate.js');

const workspaces = [{ title: '✨Bookmarks', subtitle: 'bookmarks', arg: 'bookmarks' }];

const TWELVE_HOURS_MINUTES = 720;
const userMaxAge = process.env.userMaxAge || TWELVE_HOURS_MINUTES;
const workspaceMaxAge = process.env.workspaceMaxAge || TWELVE_HOURS_MINUTES;

authenticate().then(({ workspaceService, userService }) => {
    userService.load({ maxAge: userMaxAge }).then((result) => {
        let users = [result].filter(user => user.slug);
        workspaceService.load({ maxAge: workspaceMaxAge }).then(({ values }) => {
            const tmp = workspaceService.output(users.concat(values));
            users = workspaces.concat(tmp);
            const matches = alfy.inputMatches(users, 'title');
            alfy.output(matches);
        });
    });
});
