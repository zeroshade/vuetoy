<template>
  <v-layout row justify-center class='full' style='position: absolute'>
    <!-- <template v-for='ev in events'> -->
    <template v-for='(col, idx) in eventColumns'>
      <v-flex v-bind="{[`xs${12/eventColumns.length}`]: true}" d-block :key='idx'
        v-bind:style="{
           top: (2 * pixelHeight * col[0].start.diff(date, 'hours', true) - 1) + 'px',
           marginTop: 0,
           position: 'relative',
          }"
      >
        <div v-for='ev in colItems(col)' :key='ev.ev.desc' class="text-xs-center" v-bind:style="{
            height: (ev.ev.duration.asMinutes()/30 * pixelHeight - 1) + 'px',
            marginTop: ev.margin + 'px',
          }">
          <v-btn class='entry full-height' dark :color="colorMap[ev.ev.room]" @click.stop='ev.ev.viewing = true' block>
            <span><v-icon v-if='ev.ev.icon' dark>{{ev.ev.icon}}</v-icon> {{ ev.ev.desc }}</span>
          </v-btn>
          <v-dialog v-model="ev.ev.viewing" width="500">
            <v-card>
              <v-card-title :class="colorMap[ev.ev.room] + ' headline'" primary-title>
                {{ ev.ev.desc }}
              </v-card-title>

              <v-card-text>
                FOOOBARAREARLK
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </v-flex>
  </template>
  </v-layout>
</template>

<script lang='ts'>
import moment from 'moment';
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface SchedEvent {
  start: moment.Moment;
  duration: moment.Duration;
  desc: string;
  room: string;
  viewing: boolean;
  icon?: string;
}

@Component
export default class Event extends Vue {
  public colorMap: {[index: string]: string} = {
    game: 'indigo darken-1',
    play: 'green accent-4',
    social: 'orange darken-2',
    other: 'red darken-2',
  };

  @Prop({ default: 50 }) protected pixelHeight!: number;
  @Prop(Array) protected events!: SchedEvent[];
  @Prop(Date) protected date!: Date;

  protected get eventColumns(): SchedEvent[][] {
    const cols: SchedEvent[][] = [];

    for (const ev of this.events) {
      let placed: boolean = false;
      for (const c of cols) {
        const lastEvent: SchedEvent = c[c.length - 1];
        const end: moment.Moment = moment(lastEvent.start).add(lastEvent.duration);

        if (ev.start.isAfter(end)) {
          c.push(ev);
          placed = true;
          break;
        }
      }

      if (placed) {
        continue;
      }

      cols.push([ev]);
    }
    return cols;
  }

  protected colItems(col: SchedEvent[]): Array<{ ev: SchedEvent, margin: number}> {
    const res: Array<{ ev: SchedEvent, margin: number}> = [];
    for (const ev of col) {
      if (!res.length) {
        res.push({ev, margin: 0});
        continue;
      }
      const lastEvent = res[res.length - 1].ev;
      const prevEnd = moment(lastEvent.start).add(lastEvent.duration);
      res.push({ev, margin: this.pixelHeight * (ev.start.diff(prevEnd, 'minutes') / 30)});
    }
    return res;
  }
}
</script>

<style scoped lang='scss'>
.full {
  width: 100%;
}

.full-height {
  height: 100%;
}

.entry {
  margin-top: 0;

  span {
    white-space: pre-line;
  }
}
</style>
