import licenses from './data/licenses';

export const licenseList = licenses;

export const licenseDict = licenses.reduce((dict, license, idx) => ({
  ...dict,
  [idx]: license,
}), {});

export const getLicense = id => licenseDict[id];

export const byCategory = licenses.reduce((groups, license, idx) => ({
  ...groups,
  [license.category]: (groups[license.category] || []).concat(idx),
}), {});

const keys = [];

// eslint-disable-next-line
export const jobs = [
  'White Mage',
  'Uhlan',
  'Machinist',
  'Red Battlemage',
  'Knight',
  'Monk',
  'Time Battlemage',
  'Foebreaker',
  'Archer',
  'Black Mage',
  'Bushi',
  'Shikari',
].map(job => ({
  name: job,
  board: licenses.reduce((board, license, idx) => {
    if (/,/.test(license.board[job])) {
      return {
        ...board,
        ...license.board[job]
          .split(/,\s*|\s+/)
          .map(cell => cell.trim())
          .reduce((cellsForLicense, cell) => {
            keys.push(cell);
            return ({
              ...cellsForLicense,
              [cell]: idx,
            });
          }, {}),
      };
    }
    if (license.board[job]) {
      keys.push(license.board[job]);
      return {
        ...board,
        [license.board[job]]: idx,
      };
    }
    return board;
  }, {}),
}));

window.data = {
  licenseList,
  licenseDict,
  byCategory,
  jobs,
  getLicense,
};
