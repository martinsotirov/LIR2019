<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Timetable</h1>

    <div class="day" v-for="(day, i) in days" :key="`day-${i}`">
      <h2>Day {{ i + 1 }}</h2>
      <div v-for="(stage, id) in day.stages" :key="`${day}-${id}`">
        <div v-if="setsForDayAndStage(i + 1, id).length > 0" :class="`stage stage-${id}`">
          <h3>Stage <strong>{{ stage.name }}</strong></h3>

          <table>
            <tr
              v-for="(set, j) in setsForDayAndStage(i + 1, id)"
              :key="`${i}-${j}`"
              :style="selectedStyle(set)"
              @click="select(set)"
            >
              <td class="timeslot"><span v-html="timeslot(set)"></span></td>
              <td class="name"><span v-html="set.name"></span></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import timetable from '@/assets/program.csv'
import stages from '@/assets/stages.json'

export default {
  name: 'Home',
  data () {
    return {
      timetable: timetable.map(set => {
        set.selected = false
        set.disabled = false
        return set
      }),
      stages,
      days: [
        { name: 'Thursday', stages },
        { name: 'Friday', stages },
        { name: 'Saturday', stages }
      ]
    }
  },
  methods: {
    setsForDayAndStage (day, stage) {
      let sets = []
      this.timetable.forEach(set => {
        if (set.day === day && set.stage === stage) {
          sets.push(set)
        }
      })
      return sets
    },
    timeslot (set) {
      return `${moment(set.from).format('HH:mm')} - ${moment(set.to).format('HH:mm')}`
    },
    select (set) {
      if (set.disabled) {
        return
      }

      set.selected = !set.selected

      this.timetable.forEach(s => {
        if (s.day === set.day && s.name !== set.name) {
          // check if they overlap
          if (moment(s.from).isBefore(moment(set.to)) && moment(s.to).isAfter(moment(set.from))) {
            s.disabled = set.selected
          }
        }
      })
    },
    selectedStyle(set) {
      let color = 'white'
      if (set.disabled) {
        color = 'gray'
      } else if (set.selected) {
        color = 'tomato'
      }
      return {
        textDecoration: set.disabled ? 'line-through' : '',
        color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  padding: .2rem .5rem;
}
table {
  list-style: none;
  padding: 0;

  td {
    font-family: 'Barlow Condensed', sans-serif;
    &:hover {
      cursor: pointer;
    }
    @media screen and (min-width: 480px) {
      padding-right: 1rem;
    }

    &.timeslot {
      min-width: 95px;
    }

    &.name {
      margin-right: 1rem;

      &:last-child {
        font-weight: bold;
      }
    }
  }
}

.day {
  @media screen and (min-width: 1024px) {
    width: 30%;
    float: left;
    padding-right: 3%;
    &:last-child {
      padding-right: 0;
    }
  }
}

.stage {
  h3 {
    color: white;
  }

  &.stage-mothership h3 {
    background: #E52224;
  }

  &.stage-temple h3 {
    background: #E98823;
  }

  &.stage-eve h3 {
    background: #5AB945;
  }

  &.stage-shredder h3 {
    background: #4A4A49;
  }

  &.stage-freedom h3 {
    background: #AE4E9B;
  }

  &.stage-portal h3 {
    background: #378FCB;
  }

  &.stage-storm h3 {
    background: #FECD23;
    color: #4A4A49;
  }
}
</style>
