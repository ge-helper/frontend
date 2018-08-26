import Vue from 'vue';
import Vuex from 'vuex';
import Fuse from 'fuse.js';
import GE_10710 from '@/assets/GE_10710_0825.json';
import GE_CAT_CREDIT from '@/assets/GE_CAT_CREDIT_0825.json';
import GE_GRADE_DISTRIBUTION_10710 from '@/assets/GE_GRADE_DISTRIBUTION_48.json';
import GE_SIMILARITY_COLUMNS from '@/assets/GE_SIMILARITY_COLUMNS_339_5.json';
import GE_SIMILARITIES from '@/assets/GE_SIMILARITIES_339_5.json';

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

const compareCategories = [
  '人文',
  '社會',
  '自然',
  '核通 1',
  '核通 2',
  '核通 3',
  '核通 4',
  '核通 5',
  '核通 6',
  '核通 7',
];

const mapDeptCode = {
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

const mapGrade = {
  'A+': 95,
  A: 87,
  'A-': 82,
  'B+': 78,
  B: 74.5,
  'B-': 71,
  'C+': 68,
  C: 64.5,
  'C-': 61,
  D: 54.5,
  E: 25,
  X: 0,
  成績未到: '成績未到',
  二退: '二退',
  抵免: '抵免',
};

const GES = GE_10710.map(ge => ({
  ...ge,
  ...GE_GRADE_DISTRIBUTION_10710[ge.course_no],
  teachers: ge.teachers.map(t => t.split('\t')[0]).join('、'),
  room:
    ge.room === ''
      ? ''
      : /[A-Za-z0-9_\- ]+(\W+) *(\w*)/
          .exec(ge.room)
          .slice(1, 3)
          .join(' '),
  category: mapCategory[ge.category],
  department: mapDeptCode[ge.course_no.slice(5, 9)],
  language: ge.offered_in_english ? '英文' : '中文',
  searchScore: 0,
  reco: false,
  recoScore: 0,
  recoReasons: [],
}));

const mapCourseNo = GES.reduce((acc, cur) => {
  acc[cur.course_no] = cur;
  return acc;
}, {});

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

const getCookie = name => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

const initialFilter = {
  categories: [],
  credits: [],
  languages: [],
  departments: [],
  times: [],
};

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://ge-helper.herokuapp.com';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    drawer: true,
    drawerCart: false,
    drawerHistory: false,
    snackbar: false,
    snackbarText: '',

    importDialog: false,
    loading: false,
    id: localStorage.getItem('id'),
    courseLogs: JSON.parse(localStorage.getItem('courseLogs')) || [],
    candidates: JSON.parse(localStorage.getItem('candidates')) || [],

    search: '',
    searchResults: GES,
    filter: { ...initialFilter },
    results: GES,
    pagination: {
      rowsPerPage: 10,
    },
    sort: '相關性',

    viewDialog: false,
    view: null,
  },
  getters: {
    geLogs({ courseLogs }) {
      const geLogs = courseLogs
        .filter(c => GE_CAT_CREDIT.hasOwnProperty(c.semester + c.no))
        .map(c => ({
          course_no: c.semester + c.no,
          course_title_zh: c.name,
          grade: c.grade,
        }))
        .map(c => ({
          ...c,
          credit: GE_CAT_CREDIT[c.course_no]['credit'],
          category: GE_CAT_CREDIT[c.course_no]['category'],
        }));
      geLogs.sort(
        (a, b) =>
          compareCategories.indexOf(a.category) -
          compareCategories.indexOf(b.category)
      );
      return geLogs;
    },
    option({ searchResults }) {
      const categoryCount = {},
        creditCount = {},
        languageCount = {},
        departmentCount = {};

      searchResults.forEach(({ category, credit, language, department }) => {
        counter(categoryCount, category);
        counter(creditCount, credit);
        counter(languageCount, language);
        counter(departmentCount, department);
      });

      return {
        categoryOptions: sorter(categoryCount),
        creditOptions: sorter(creditCount),
        languageOptions: sorter(languageCount),
        departmentOptions: sorter(departmentCount),
      };
    },
    viewCourse({ view }) {
      return mapCourseNo[view];
    },
    candidateCourses({ candidates }) {
      return candidates.map(no => mapCourseNo[no]);
    },
    results({ results, sort }, { geLogs }) {
      const recoScores = new Array(GE_SIMILARITY_COLUMNS.length).fill(0);
      const recoSims = recoScores.map(v => new Set());

      const logs = geLogs.filter(
        ({ course_title_zh, grade }) =>
          !['二退', '成績未到', '抵免'].includes(grade) &&
          GE_SIMILARITY_COLUMNS.includes(course_title_zh)
      );
      const titles = logs.map(c => c.course_title_zh);
      const scores = logs.map(c => mapGrade[c.grade]);

      titles.forEach((course_title_zh, i) => {
        const idx = GE_SIMILARITY_COLUMNS.indexOf(course_title_zh);
        const sims = GE_SIMILARITIES[idx];
        sims.forEach((sim, idx) => {
          if (
            sim !== null &&
            sim > 0 &&
            scores[i] >= 70 &&
            !titles.includes(GE_SIMILARITY_COLUMNS[idx])
          ) {
            recoScores[idx] += sim * scores[i];
            recoSims[idx].add(course_title_zh);
          }
        });
      });
      const reco = recoSims.reduce((acc, sims, idx) => {
        if (!sims.size) return acc;
        const title = GE_SIMILARITY_COLUMNS[idx];
        acc[title] = {
          reasons: [...sims],
          score: recoScores[idx],
        };
        return acc;
      }, {});
      // console.log(reco);
      const recoResults = results.map(r => {
        if (!reco.hasOwnProperty(r.course_title_zh)) {
          return {
            ...r,
            reco: false,
            recoScore: 0,
            recoReasons: [],
          };
        }
        const { score, reasons } = reco[r.course_title_zh];
        return {
          ...r,
          reco: score >= 90,
          recoScore: score,
          recoReasons: reasons,
        };
      });

      if (sort === '相關性') {
        recoResults.sort((a, b) => {
          if (b.recoScore === a.recoScore) return a.searchScore - b.searchScore;
          return b.recoScore - a.recoScore;
        });
      } else if (sort === '熱門程度') {
        recoResults.sort((a, b) => {
          if (b.popularity === a.popularity)
            return a.searchScore - b.searchScore;
          return b.popularity - a.popularity;
        });
      } else if (sort === '分數甜度') {
        recoResults.sort((a, b) => {
          if (b.averageGrade === a.averageGrade)
            return a.searchScore - b.searchScore;
          return b.averageGrade - a.averageGrade;
        });
      }

      return recoResults;
    },
  },
  actions: {
    async getCourseLogs({ commit }, { ACIXSTORE, gd }) {
      commit('setLoading', true);
      try {
        const { id, courseLogs } = await fetch(
          `${BASE_URL}/get_course_logs?ACIXSTORE=${ACIXSTORE}&gd=${gd.toString()}`
        ).then(r => r.json());
        commit('setId', id);
        commit('setCourseLogs', courseLogs);
        return true;
      } catch (error) {
        return false;
      } finally {
        commit('setLoading', false);
        commit('launchSnackbar', '匯入成功！到通識列表逛逛～');
      }
    },
    async logCourseLogs({ commit }, courseLogs) {
      commit('setLoading', true);
      const body = {
        type: 'manual',
        no: courseLogs.map(v => v.semester + v.no),
        grade: courseLogs.map(v => v.grade),
      };
      const { id } = await fetch(`${BASE_URL}/log_course_logs`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then(r => r.json());
      commit('setId', id);
      commit('setCourseLogs', courseLogs);
      commit('setLoading', false);
      commit('launchSnackbar', '匯入成功');
    },
    doSearch({ commit, state }) {
      const { search } = state;
      let searchResults = GES;
      if (search.trim() !== '') {
        const options = {
          shouldSort: true,
          includeScore: true,
          threshold: 0.4,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 2,
          keys: [
            'course_title_zh',
            'course_title_en',
            'description',
            'teachers',
            'time',
            'course_no',
          ],
        };
        searchResults = new Fuse(GES, options).search(search).map(r => ({
          ...r.item,
          searchScore: r.score,
        }));
      }
      commit('setSearchResults', searchResults);
      commit('clearFilter');
      commit('setResults', searchResults);
      commit('setPagination', { page: 1 });
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
      commit('setPagination', { page: 1 });
    },
    logCartLogs({ state }) {
      const { id, candidates } = state;
      fetch(`${BASE_URL}/log_cart_logs`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id || getCookie('_gid'),
          candidates,
        }),
      }).then(r => console.log(r.status));
    },
  },
  mutations: {
    setDrawer(state, visible) {
      state.drawer = visible;
    },
    setDrawerCart(state, visible) {
      state.drawerCart = visible;
    },
    setDrawerHistory(state, visible) {
      state.drawerHistory = visible;
    },
    setSnackbar(state, visible) {
      state.snackbar = visible;
    },
    launchSnackbar(state, snackbarText) {
      state.snackbarText = snackbarText;
      state.snackbar = true;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setImportDialog(state, visible) {
      state.importDialog = visible;
    },
    setId(state, id) {
      state.id = id;
      localStorage.setItem('id', state.id);
    },
    setCourseLogs(state, courseLogs) {
      state.courseLogs = courseLogs;
      localStorage.setItem('courseLogs', JSON.stringify(state.courseLogs));
    },
    clearCourseLogs(state) {
      state.courseLogs = [];
      state.id = null;

      localStorage.removeItem('courseLogs');
      localStorage.removeItem('id');
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
    setSort(state, sort) {
      state.sort = sort;
    },
    setView(state, view) {
      state.view = view;
    },
    setViewDialog(state, visible) {
      state.viewDialog = visible;
    },
    addCandidate(state, course_no) {
      if (state.candidates.includes(course_no)) return;
      state.candidates.push(course_no);
      localStorage.setItem('candidates', JSON.stringify(state.candidates));
    },
    removeCandidate(state, course_no) {
      const loc = state.candidates.indexOf(course_no);
      if (loc === -1) return;
      state.candidates.splice(loc, 1);
      localStorage.setItem('candidates', JSON.stringify(state.candidates));
    },
    setPagination(state, pagination) {
      state.pagination = { ...state.pagination, ...pagination };
    },
  },
});
