const alfy = require('alfy');
const authenticate = require('./authenticate.js');

const workspaces = [{ title: '✨Bookmarks', subtitle: 'bookmarks', arg: 'bookmarks' }];

const TWELVE_HOURS_MINUTES = 720;
const userMaxAge = process.env.userMaxAge || TWELVE_HOURS_MINUTES;
const workspaceMaxAge = process.env.workspaceMaxAge || TWELVE_HOURS_MINUTES;

authenticate().then(({ workspaceService, userService }) => {
    userService.load({ maxAge: userMaxAge }).then((result) => {
        let users = [result];
        workspaceService.load({ maxAge: workspaceMaxAge }).then(({ values }) => {
            users = workspaces.concat(workspaceService.output(users.concat(values)));
            alfy.output(alfy.inputMatches(users, 'title'));
        });
    });
});
