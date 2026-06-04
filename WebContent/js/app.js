const BASE_URL = '/student/B11209013/NovaLink.nsf/api/data/collections/name'
const COMPOSE_BASE = '/student/B11209013/NovaLink.nsf'

const { createApp } = Vue

createApp({
  data() {
    return {
      currentPage: 'thanks',
      loading: false,
      moodList: [],
      thanksList: [],
      proposalList: [],
      coinList: []
    }
  },

  watch: {
    currentPage(newPage) {
      this.loadPage(newPage)
    }
  },

  mounted() {
    this.loadPage(this.currentPage)
  },

  methods: {
    async loadPage(page) {
      this.loading = true
      try {
        if (page === 'mood') await this.loadMood()
        if (page === 'thanks') await this.loadThanks()
        if (page === 'proposal') await this.loadProposal()
        if (page === 'coin') await this.loadCoin()
      } catch (e) {
        console.error('載入失敗', e)
      }
      this.loading = false
    },

    async loadMood() {
      const res = await axios.get(`${BASE_URL}/VNLKM10?count=50`)
      this.moodList = res.data
    },

    async loadThanks() {
      const res = await axios.get(`${BASE_URL}/VNLKM20?count=50`)
      this.thanksList = res.data
    },

    async loadProposal() {
      const res = await axios.get(`${BASE_URL}/VNLKM30?count=50`)
      this.proposalList = res.data
    },

    async loadCoin() {
      const res = await axios.get(`${BASE_URL}/VNLKT51?count=100`)
      this.coinList = res.data
    },

    composeUrl(formName) {
      return `${COMPOSE_BASE}/${formName}?OpenForm`
    },

    moodEmoji(score) {
      const map = { '1': '😢', '2': '😕', '3': '😐', '4': '🙂', '5': '😄' }
      return map[score] || '😐'
    },

    stressColor(level) {
      const colors = { '1': '#4caf50', '2': '#8bc34a', '3': '#ffc107', '4': '#ff9800', '5': '#f44336' }
      return colors[level] || '#ccc'
    },

    statusLabel(status) {
      const map = {
        'Draft': '草稿',
        'Open': '募資中',
        'Pending': '待審',
        'Review': '審核中',
        'Approved': '已採用',
        'Rejected': '已退回'
      }
      return map[status] || status
    },

    progressWidth(current, target) {
      if (!target || target <= 0) return '0%'
      const pct = Math.min(Math.round((current || 0) / target * 100), 100)
      return pct + '%'
    },

    progressPercent(current, target) {
      if (!target || target <= 0) return '0%'
      return Math.min(Math.round((current || 0) / target * 100), 100) + '%'
    }
  }
}).mount('#app')