import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { GoLaw } from 'react-icons/go';

import ExternalLink from '../common/ExternalLink';
import SmallTitle from '../common/SmallTitle';
import styles from './License.module.css';

interface Props {
  license?: null | string;
}

const LICENSES_LIST: string[] = [
  '0bsd',
  'afl-3.0',
  'agpl-3.0',
  'apache-2.0',
  'artistic-2.0',
  'bsd-2-clause',
  'bsd-3-clause-clear',
  'bsd-3-clause',
  'bsd-4-clause',
  'bsl-1.0',
  'cc-by-4.0',
  'cc-by-sa-4.0',
  'cc0-1.0',
  'cecill-2.1',
  'ecl-2.0',
  'epl-1.0',
  'epl-2.0',
  'eupl-1.1',
  'eupl-1.2',
  'gpl-2.0',
  'gpl-3.0',
  'isc',
  'lgpl-2.1',
  'lgpl-3.0',
  'lppl-1.3c',
  'mit',
  'mpl-2.0',
  'ms-pl',
  'ms-rl',
  'ncsa',
  'odbl-1.0',
  'ofl-1.1',
  'osl-3.0',
  'postgresql',
  'unlicense',
  'upl-1.0',
  'vim',
  'wtfpl',
  'zlib',
];

const License = (props: Props) => {
  if (isUndefined(props.license) || isNull(props.license)) return null;

  return (
    <>
      <SmallTitle text="License" />
      <div className="mb-3">
        {LICENSES_LIST.includes(props.license.toLowerCase()) ? (
          <ExternalLink
            href={`https://choosealicense.com/licenses/${props.license.toLowerCase()}/`}
            className="text-primary py-1 py-sm-0"
          >
            <div className="d-flex align-items-center">
              <GoLaw className="text-muted mr-2 h6 mb-0" />
              <>{props.license}</>
              <span className={styles.smallIcon}>
                <FiExternalLink className="ml-1" />
              </span>
            </div>
          </ExternalLink>
        ) : (
          <div className="d-flex align-items-center">
            <GoLaw className="text-muted mr-2 h6 mb-0" />
            <>{props.license}</>
          </div>
        )}
      </div>
    </>
  );
};

export default License;
