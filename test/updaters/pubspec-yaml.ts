// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {readFileSync} from 'fs';
import {resolve} from 'path';
import * as snapshot from 'snap-shot-it';
import {describe, it} from 'mocha';
import {PubspecYaml} from '../../src/updaters/pubspec-yaml';

const fixturesPath = './test/updaters/fixtures';

describe('PubspecYaml', () => {
  describe('updateContent', () => {
    it('updates version in pubspec.yaml file', async () => {
      const oldContent = readFileSync(
        resolve(fixturesPath, './pubspec.yaml'),
        'utf8'
      ).replace(/\r\n/g, '\n');
      const version = new PubspecYaml({
        path: 'pubspec.yaml',
        changelogEntry: '',
        version: '0.6.0',
        packageName: '',
      });
      const newContent = version.updateContent(oldContent);
      snapshot(newContent.replace(/\r\n/g, '\n'));
    });

    it('updates version with build number in pubspec.yaml file', async () => {
      const oldContent = readFileSync(
        resolve(fixturesPath, './pubspec_with_build_no.yaml'),
        'utf8'
      ).replace(/\r\n/g, '\n');
      const version = new PubspecYaml({
        path: 'pubspec.yaml',
        changelogEntry: '',
        version: '0.6.0',
        packageName: '',
      });
      const newContent = version.updateContent(oldContent);
      snapshot(newContent.replace(/\r\n/g, '\n'));
    });
  });
});
