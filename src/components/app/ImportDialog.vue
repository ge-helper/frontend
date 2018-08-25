<template>
  <v-dialog v-model="importDialog"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs"
    width="640">
    <v-card>
      <v-card-text class="pa-0"
        style="min-height: calc(100% - 53px);-webkit-overflow-scrolling: touch;">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step step="1"
              :complete="step > 1">聲明</v-stepper-step>
            <v-divider/>
            <v-stepper-step step="2"
              :editable="step > 1"
              :complete="step > 2">方式</v-stepper-step>
            <v-divider/>
            <v-stepper-step step="3">匯入</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items :style="{'min-height': $vuetify.breakpoint.xs ? 'calc(100vh - 125px)' : 'initial'}">
            <v-stepper-content class="pa-3"
              step="1">
              <p>清大通識小幫手為學生開發，我們力求資料的正確性，但實際規定仍以課務組為主。</p>
              <p>
                我們僅取得您的修課紀錄，包含：
                <ul>
                  <li>科號</li>
                  <li>成績</li>
                </ul>
              </p>
              <p>
                <span>我們</span>
                <span class="red--text">沒有</span>取得您的個人資料，如：
                <ul>
                  <li>姓名</li>
                  <li>學號</li>
                  <li>系級</li>
                </ul>
              </p>
            </v-stepper-content>
            <v-stepper-content class="pa-0"
              step="2">
              <v-container grid-list-lg>
                <v-layout wrap>
                  <v-flex xs12
                    sm6
                    @click="auto"
                    style="cursor: pointer;">
                    <v-card>
                      <v-card-title>
                        <h3>自動匯入</h3>
                      </v-card-title>
                      <v-card-media src="https://i.imgur.com/WfrI3x0.gif"
                        height="200px" />
                    </v-card>
                  </v-flex>
                  <v-flex xs12
                    sm6
                    @click="manual"
                    style="cursor: pointer;">
                    <v-card>
                      <v-card-title>
                        <h3>手動複製</h3>
                      </v-card-title>
                      <v-card-media src="https://i.imgur.com/tyn7kAo.gif"
                        height="200px" />
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-stepper-content>
            <v-stepper-content class="pa-3"
              step="3">
              <h4 v-if="importType === IMPORT_TYPE_AUTO">
                <span>請貼上登入</span>
                <a target="_blank"
                  href="https://www.ccxp.nthu.edu.tw/ccxp/INQUIRE/">校務資訊系統</a>後的連結</h4>
              <h4 v-else>
                <span>登入</span>
                <a target="_blank"
                  href="https://www.ccxp.nthu.edu.tw/ccxp/INQUIRE/">校務資訊系統</a>，並進入成績查詢頁面。從黃色底開始複製，複製到粉色底「修習總學分」</h4>
              <v-form ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="submit">
                <v-textarea v-if="importType === IMPORT_TYPE_MANUAL"
                  label="修課紀錄"
                  :rules="textRules"
                  v-model="text" />
                <v-text-field v-else
                  label="連結"
                  :rules="urlRules"
                  v-model="url"
                  placeholder="https://www.ccxp.nthu.edu.tw/ccxp/INQUIRE/select_entry.php?ACIXSTORE=6991bcrjqktcjampue1nrugeu0" />
                <v-checkbox v-if="importType === IMPORT_TYPE_AUTO"
                  label="我願意匿名分享成績分布給其他同學"
                  v-model="gd"
                  hide-details
                  class="my-0" />
                <img :src="importType === IMPORT_TYPE_AUTO ? 'https://i.imgur.com/WfrI3x0.gif' : 'https://i.imgur.com/tyn7kAo.gif'"
                  style="width: 100%" />
              </v-form>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-btn v-show="step === 3"
          flat
          @click="step--">上一步</v-btn>
        <v-btn v-show="step !== 3"
          flat
          @click="importDialog = false">取消</v-btn>
        <v-spacer/>
        <v-btn v-show="step === 1"
          color="primary"
          flat
          @click="agree">我同意</v-btn>
        <v-btn v-show="step === 3"
          flat
          color="primary"
          @click="submit">匯入</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { parseCourseLog } from '@/common/parseCourseLog';

const IMPORT_TYPE_AUTO = 'IMPORT_TYPE_AUTO';
const IMPORT_TYPE_MANUAL = 'IMPORT_TYPE_MANUAL';

export default {
  name: 'AppImportDialog',
  data() {
    return {
      step: 1,
      importType: null,
      IMPORT_TYPE_AUTO,
      IMPORT_TYPE_MANUAL,
      valid: true,
      url: '',
      text: '',
      gd: false,
      urlRules: [
        v => !!v || '必填',
        v =>
          /(https:\/\/)?www.ccxp.nthu.edu.tw\/ccxp\/INQUIRE\/select_entry.php\?ACIXSTORE=[a-z0-9]{26}/.test(
            v
          ) || '請貼上正確的連結',
      ],
      textRules: [
        v => !!v || '必填',
        v => this.validateText(v) || '請貼上正確的修課紀錄',
      ],
      tempLogs: [],
      loading: false,
    };
  },
  computed: {
    importDialog: {
      get() {
        return this.$store.state.importDialog;
      },
      set(value) {
        if (!value) {
          this.step = 1;
          this.importType = null;
          this.$refs.form.reset();
          this.tempLogs = [];
          this.loading = false;
        }
        this.setImportDialog(value);
      },
    },
  },
  methods: {
    ...mapMutations(['setImportDialog', 'setDrawerHistory', 'setDrawer']),
    ...mapActions(['getCourseLogs', 'logCourseLogs']),
    validateText(v) {
      this.tempLogs = parseCourseLog(v);
      return this.tempLogs.length > 0;
    },
    agree() {
      FB.AppEvents.logEvent('importAgree');
      this.step++;
    },
    auto() {
      FB.AppEvents.logEvent('importAuto');
      this.step++;
      this.importType = IMPORT_TYPE_AUTO;
    },
    manual() {
      FB.AppEvents.logEvent('importManual');
      this.step++;
      this.importType = IMPORT_TYPE_MANUAL;
    },
    async submit() {
      if (this.$refs.form.validate()) {
        FB.AppEvents.logEvent('importEnd');
        if (this.importType === IMPORT_TYPE_AUTO) {
          this.getCourseLogs({
            ACIXSTORE: /[a-z0-9]{26}/.exec(this.url)[0],
            gd: this.gd,
          });
        } else {
          this.logCourseLogs(this.tempLogs);
        }
        this.importDialog = false;
        this.setDrawer(true);
        this.setDrawerHistory(true);
      }
    },
  },
};
</script>