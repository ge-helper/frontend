import Vue from 'vue';
import Vuex from 'vuex';
import Fuse from 'fuse.js';
import GE10710_0815 from '@/assets/GE10710_0815.json';

const mapCategory = {
  '': '',
  '人文學領域 Elective GE course: Humanities': '人文',
  '社會科學領域 Elective GE course: Social Sciences': '社會',
  '自然科學領域 Elective GE course: Natural Sciences': '自然',
  '核心通識Core GE courses 1': '核通 1',
  '核心通識Core GE courses 2': '核通 2',
  '核心通識Core GE courses 3': '核通 3',
  '核心通識Core GE courses 4': '核通 4',
  '核心通識Core GE courses 5': '核通 5',
  '核心通識Core GE courses 6': '核通 6',
  '核心通識Core GE courses 7': '核通 7',
};

const mapDepartment = {
  'BME ': '醫工所',
  BMES: '醫環系',
  'CHE ': '化工系',
  'CL  ': '中文系',
  'DMS ': '醫科系',
  ECON: '經濟系',
  'FL  ': '外語系',
  'GE  ': '通識中心',
  'GEC ': '通識核心',
  'HIS ': '歷史所',
  'HSS ': '人社院學士班',
  IEEM: '工工系',
  IPTH: '清華學院學士班',
  'JMU ': '音樂系',
  'LS  ': '生科系',
  'LST ': '科法所',
  PHYS: '物理系',
  STAT: '統計所',
  'TE  ': '師培中心(中等教程)',
  'TM  ': '科管所',
  'WH  ': '跨系統,台聯大&互惠課',
  'WW  ': '交大課程',
  'WZ  ': '外校課程',
  'XA  ': '抵免課程(大)',
};

const GES = GE10710_0815.map(ge => ({
  ...ge,
  teachers: ge.teachers.map(t => t.split('\t')[0]).join('、'),
  room:
    ge.room === ''
      ? ''
      : /[A-Za-z0-9_\- ]+(\W+) *(\w*)/
          .exec(ge.room)
          .slice(1, 3)
          .join(' '),
  category: mapCategory[ge.category],
  department: mapDepartment[ge.course_no.slice(5, 9)],
  language: ge.offered_in_english ? '英文' : '中文',
}));

const counter = (obj, key) => {
  obj[key] = obj.hasOwnProperty(key) ? obj[key] + 1 : 1;
};

const sorter = obj => {
  const ret = Object.keys(obj)
    .map(k => [k, obj[k]])
    .filter(opt => opt[1] > 0);
  ret.sort((a, b) => b[1] - a[1]);
  return ret;
};

const initialFilter = {
  categories: [],
  credits: [],
  languages: [],
  departments: [],
  times: [],
};

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    drawer: true,

    loading: false,
    logs: [],
    candidates: [],

    search: '',
    searchResults: GES,
    filter: { ...initialFilter },
    results: GES,
    sort: '',

    viewDialog: false,
    view: null,
  },
  getters: {
    option({ searchResults }) {
      const categoryCount = {},
        creditCount = {},
        languageCount = {},
        departmentCount = {};

      searchResults.forEach(
        ({ category, credit, language, department }) => {
          counter(categoryCount, category);
          counter(creditCount, credit);
          counter(languageCount, language);
          counter(departmentCount, department);
        }
      );

      return {
        categoryOptions: sorter(categoryCount),
        creditOptions: sorter(creditCount),
        languageOptions: sorter(languageCount),
        departmentOptions: sorter(departmentCount),
      };
    },
  },
  actions: {
    doSearch({ commit, state }) {
      const { search } = state;
      let searchResults = GES;
      if (search.trim() !== '') {
        const options = {
          shouldSort: true,
          threshold: 0.4,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 2,
          keys: [
            'course_title_zh',
            'course_title_en',
            'teachers',
            'time',
            'course_no',
          ],
        };
        searchResults = new Fuse(GES, options).search(search);
      }
      commit('setSearchResults', searchResults);
      commit('clearFilter');
      commit('setResults', searchResults);
    },
    doFilter({ commit, state }) {
      // results
      let results = state.searchResults;
      const {
        categories,
        credits,
        languages,
        departments,
        times,
      } = state.filter;
      if (categories.length) {
        results = results.filter(({ category }) =>
          categories.includes(category)
        );
      }
      if (credits.length) {
        results = results.filter(({ credit }) => credits.includes(credit));
      }
      if (languages.length) {
        results = results.filter(({ language }) =>
          languages.includes(language)
        );
      }
      if (departments.length) {
        results = results.filter(({ department }) =>
          departments.includes(department)
        );
      }
      if (times.length) {
        results = results.filter(({ time }) =>
          time.match(/.{2}/g).every(t => times.includes(t))
        );
      }
      commit('setResults', results);
    },
  },
  mutations: {
    setDrawer(state, visible) {
      state.drawer = visible;
    },
    setViewDialog(state, visible) {
      state.viewDialog = visible;
    },
    setSearch(state, search) {
      state.search = search;
    },
    setSearchResults(state, searchResults) {
      state.searchResults = searchResults;
    },
    clearFilter(state) {
      state.filter = { ...initialFilter };
    },
    setFilter(state, filter) {
      state.filter = { ...state.filter, ...filter };
    },
    setResults(state, results) {
      state.results = results;
    },
  },
});
