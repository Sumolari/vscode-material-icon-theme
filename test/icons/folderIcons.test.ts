import * as assert from 'assert';
import { IconConfiguration, FolderIcons, FolderType, IconJsonOptions } from '../../src/models/index';
import { getFolderIconDefinitions, getDefaultIconOptions } from '../../src/icons/index';
import * as merge from 'lodash.merge';

suite('folder icons', () => {
    const folderIcons: FolderIcons = {
        defaultIcon: 'folder',
        rootFolder: 'folder',
        icons: [
            { name: 'folder-src', folderNames: ['src', 'source'] },
            { name: 'folder-dist', folderNames: ['dist', 'build'] }
        ],
        themes: [
            { name: FolderType.Blue, defaultIcon: 'folder-blue' },
            { name: FolderType.Classic, defaultIcon: 'folder' },
            { name: FolderType.None, defaultIcon: '' },
        ]
    };
    const iconConfig = new IconConfiguration();

    test('should configure icon definitions', () => {
        const options = getDefaultIconOptions();
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();
        value.iconDefinitions = {
            'folder': {
                'iconPath': './../../icons/folder.svg'
            },
            'folder-open': {
                'iconPath': './../../icons/folder-open.svg'
            },
            'folder-src': {
                'iconPath': './../../icons/folder-src.svg'
            },
            'folder-src-open': {
                'iconPath': './../../icons/folder-src-open.svg'
            },
            'folder-dist': {
                'iconPath': './../../icons/folder-dist.svg'
            },
            'folder-dist-open': {
                'iconPath': './../../icons/folder-dist-open.svg'
            }
        };
        value.folder = 'folder';
        value.folderExpanded = 'folder-open';
        value.rootFolder = 'folder';
        value.rootFolderExpanded = 'folder-open';
        value.folderNames = {
            'src': 'folder-src',
            'source': 'folder-src',
            'dist': 'folder-dist',
            'build': 'folder-dist'
        };
        value.folderNamesExpanded = {
            'src': 'folder-src-open',
            'source': 'folder-src-open',
            'dist': 'folder-dist-open',
            'build': 'folder-dist-open'
        };

        assert.deepEqual(def, value);
    });

    test('deactivate folder icons', () => {
        const options = getDefaultIconOptions();
        options.folderTheme = FolderType.None;
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {};
        value.folderNames = {};
        value.folderNamesExpanded = {};

        assert.deepEqual(def, value);
    });

    test('enable folder theme', () => {
        const options = getDefaultIconOptions();
        options.folderTheme = FolderType.Blue;
        const def = getFolderIconDefinitions(folderIcons, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'folder-blue': {
                'iconPath': './../../icons/folder-blue.svg'
            },
            'folder-blue-open': {
                'iconPath': './../../icons/folder-blue-open.svg'
            }
        };
        value.folder = 'folder-blue';
        value.folderExpanded = 'folder-blue-open';
        value.rootFolder = 'folder-blue';
        value.rootFolderExpanded = 'folder-blue-open';

        assert.deepEqual(def, value);
    });

    test('enable folder theme and use default icons', () => {
        const options = getDefaultIconOptions();
        options.folderTheme = FolderType.Blue;
        const folderIconsUpdated = merge({}, folderIcons);
        const theme = folderIconsUpdated.themes.find(theme => theme.name === FolderType.Blue);
        theme.useDefaultIcons = true;
        const def = getFolderIconDefinitions(folderIconsUpdated, iconConfig, options);
        const value = new IconConfiguration();

        value.iconDefinitions = {
            'folder-blue': {
                'iconPath': './../../icons/folder-blue.svg'
            },
            'folder-blue-open': {
                'iconPath': './../../icons/folder-blue-open.svg'
            },
            'folder-src': {
                'iconPath': './../../icons/folder-src.svg'
            },
            'folder-src-open': {
                'iconPath': './../../icons/folder-src-open.svg'
            },
            'folder-dist': {
                'iconPath': './../../icons/folder-dist.svg'
            },
            'folder-dist-open': {
                'iconPath': './../../icons/folder-dist-open.svg'
            }
        };
        value.folder = 'folder-blue';
        value.folderExpanded = 'folder-blue-open';
        value.rootFolder = 'folder-blue';
        value.rootFolderExpanded = 'folder-blue-open';

        value.folderNames = {
            'src': 'folder-src',
            'source': 'folder-src',
            'dist': 'folder-dist',
            'build': 'folder-dist'
        };
        value.folderNamesExpanded = {
            'src': 'folder-src-open',
            'source': 'folder-src-open',
            'dist': 'folder-dist-open',
            'build': 'folder-dist-open'
        };

        assert.deepEqual(def, value);
    });
});