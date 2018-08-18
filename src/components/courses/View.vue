<template>
  <v-dialog v-model="dialog"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs"
    width="640">
    <v-card>
      <v-card-title>歷史文化經典：《資治通鑑(東漢部分)》選讀</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0"
        style="min-height: calc(100% - 107px);-webkit-overflow-scrolling: touch;">
        <v-tabs color="cyan"
          slider-color="yellow"
          dark>
          <v-tab>基本資訊</v-tab>
          <v-tab>課程大綱</v-tab>
          <v-tab>更多資訊</v-tab>
          <v-tab-item>
            <h4 class="px-3 pt-3">課程資訊</h4>
            <v-layout wrap>
              <v-flex xs12
                sm6>
                <v-list dense
                  class="py-0">
                  <template v-for="(info, i) in infos.slice(0, 4)">
                    <v-list-tile :key="i + infos.length">
                      <v-list-tile-content>{{ `${info.name}：${info.value}` }}</v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="i" />
                  </template>
                </v-list>
              </v-flex>
              <v-flex xs12
                sm6>
                <v-list dense
                  class="py-0">
                  <template v-for="(info, i) in infos.slice(4, 8)">
                    <v-list-tile :key="i + infos.length">
                      <v-list-tile-content>{{ `${info.name}：${info.value}` }}</v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="i" />
                  </template>
                </v-list>
              </v-flex>
            </v-layout>
            <div class="pa-3">
              <h4 class="pb-2">成績分佈</h4>
            </div>
            <div class="pa-3">
              <h4 class="pb-2">課程簡述</h4>
              <p class="ma-0"
                style="font-size: 13px;">
                不同的族群為何被稱為「少數民族」？從人類學的觀點來看，這是因為「自我」與「他者」的對照，由自詡為主流的「自我」 所提出的詞彙。本課程以此認識為出發點，著重於「自我」與「他者」之對照競合，以及在此脈絡下「少數民族」的境遇。本 課程將「少數民族」的文化特徵，放入民族國家、自我-他者對照、社會變遷、生存與發展的脈絡中來理解，而不以細究「少數 民族」的文化表徵為主要課程目標。有興趣修習本課程的同學，宜注意三個關鍵字，以理解本課程的架構與目標：「中國」 （作為民族國家與治權）、「民族」（在中國歷史至當代轉型中的發展與變化）、「少數」（在一個多元族群社會中的意義與 位置）。閱讀材料包括人類學、歷史學、社會學、政治學、文學、醫療與科學方面的研究。
              </p>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div>
              <iframe src="http://docs.google.com/gview?embedded=true&url=https://www.ccxp.nthu.edu.tw/ccxp/INQUIRE/JH/output/6_6.1_6.1.12/10710GE%20%20171400.pdf"
                style="width:100%; height:1000px;"
                frameborder="0" />
            </div>
          </v-tab-item>
          <v-tab-item style="min-height: 105px;">
            <div>
              <h4 class="px-3 pt-3">更多資訊</h4>
              <template v-for="(info, i) in infos.slice(8)">
                <v-divider v-if="i"
                  :key="i" />
                <div class="px-3 my-2"
                  style="font-size: 13px;"
                  :key="i + infos.length">{{ `${info.name}：${info.value}` }}</div>
              </template>

            </div>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat
          @click="dialog = false">取消</v-btn>
        <v-btn color="primary"
          flat
          @click="dialog = false">加入候選</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CourseView',
  data() {
    return {
      dialog: false,
      infos: [
        {
          name: '科號',
          value: '10710ANTH653500',
        },
        {
          name: '學分',
          value: '3',
        },
        {
          name: '教師',
          value: '萬德輝、鄭兆珉、林宗宏、陳韻晶、黃玠誠、魯才德',
        },
        {
          name: '授課語言',
          value: '中文',
        },
        {
          name: '時間',
          value: 'W1W2W34',
        },
        {
          name: '教室／容量',
          value: '人社C304／50 人',
        },
        {
          name: '修課人數／人數上限',
          value: '50 人／60 人',
        },
        {
          name: '類別',
          value: '核心通識第一向度',
        },
        {
          name: '新生保留',
          value: '0 人',
        },
        {
          name: '備註',
          value:
            '《磨課師輔助教學 blended learning with MOOCs》, 非同步遠距教學',
        },
        {
          name: '限制',
          value:
            '藝術學院,人社院,科管院,竹師學院,清華學院優先，第3次選課起開放全校修習',
        },
        {
          name: '通識對象',
          value:
            '開課系（所）所屬學院學生不可選修，其他（院）系學生可做為通識學分課程。',
        },
        {
          name: '先修',
          value: [
            '未修過現代社會與心理',
            '未修過普通心理學',
            '未修過心理學',
            '未修過普通心理學一',
            '未修過普通心理學二',
          ].join('、'),
        },
        {
          name: '必選修',
          value: [
            '經濟系107BA	必修',
            '經濟系107BB	必修',
            '人社院學士班107BA	選修',
            '人社院學士班107BB	選修',
            '工工系107B	必修',
            '計財系107B	必修',
            '科管院學士班107B	必修',
          ].join('、'),
        },
        {
          name: '一二專',
          value: [
            '經濟(第一專長)',
            '經濟(第二專長)',
            '法律(第一專長)',
            '管理(第一專長)',
            '計量財務金融(第一專長)',
          ].join('、'),
        },
        {
          name: '學分學程',
          value: ['能源科技與永續', '能源', '永續發展與環境管理'].join('、'),
        },
      ],
    };
  },
};
</script>