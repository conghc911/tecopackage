import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';
import { stores } from './stores.module';
import { notice } from './notice.module';
import { resource } from './resource.module';
import { blacklist } from './blacklist.module';
import { dictionary } from './dictionary.module';
import { packages } from './package.module';
import { lead } from './lead.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        authentication,
        users,
        stores,
        notice,
        resource,
        blacklist,
        dictionary,
        packages,
        lead
    }
});
