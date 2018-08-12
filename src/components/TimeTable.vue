 <template>
  <v-container style='position: relative'>
    <v-list one-line class='background-sched'>
      <template v-for="t in times">
        <v-list-tile tag='span' class='time-span'>
          <v-list-tile-content class='time-tile'>
            <v-list-tile-title class='time-label'>{{ t }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-layout row justify-start align-baseline class='events'>
      <v-flex v-bind="{ [`xs${12/dateRange.length}`]: true}" d-block mb-0 class='event-group' v-for='date in dateRange'>
        <v-card flat height=50 tile class='top-info'>
          <v-card-title><span class='text-xs-center'>{{ date | moment().format('dddd') }}</span></v-card-title>
        </v-card>

        <v-list two-line style='background: none; padding: 0px; height: 100%; position: relative;'>
          <template v-for='ev in events' v-if="ev.start.isSame(date, 'day')">
            <v-list-tile @click=""
                style="position: absolute; background: indigo;"
                v-bind:style="{
                              top: (100 * ev.start.diff(date, 'hours', true) - 1) + 'px',
                              height: (ev.duration.minutes()/30 * 50 - 1) + 'px' }">
              <v-list-tile-content>
                <v-list-tile-title>{{ ev.desc }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Prop, Vue } from 'vue-property-decorator';

const startTime: moment.Moment = moment('12:00', 'HH:mm');
const numHours: number = 14;

@Component
export default class TimeTable extends Vue {
  public start: moment.Moment = startTime;

  public get end(): moment.Moment {
    const end: moment.Moment = this.start.clone();
    end.add(numHours, 'hours');
    return end;
  }

  public dayStart: Date = new Date(2018, 6, 27, 12);
  public dayEnd: Date = new Date(2018, 6, 29, 12);

  public events: Array<{ start: moment.Moment, duration: moment.Duration, desc: string }> = [
    {
      start: moment(new Date('7/27/2018 6:30 PM')),
      duration: moment.duration(45, 'minutes'),
      desc: 'Set Up',
    },
  ];

  public get times(): string[] {
    const res: string[] = [];
    for (const m: moment.Moment = this.start.clone(); m.isBefore(this.end); m.add(30, 'minutes')) {
      res.push(m.format('hh:mm A'));
    }
    res.push(this.end.format('hh:mm A'));
    return res;
  }

  public get dateRange(): Date[] {
    const res: Date[] = [];
    for (const m: moment.Moment = moment(this.dayStart); m.isBefore(this.dayEnd); m.add(1, 'day')) {
      res.push(m.toDate());
    }
    res.push(this.dayEnd);
    return res;
  }
}
</script>

<style scoped lang="scss">
.background-sched {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: none;
  display: block;
  padding-top: 50px;
}

.top-info {
  height: 50px;
  border-bottom: 1px solid purple;
  padding: 0px;

  div {
    height: 100%;
    padding: 0px;
  }

  span {
    width: 100%;
    padding: 0 .5em;
  }
}

.events {
  width: calc(100% - 75px);
  margin-left: 75px;
  position: relative;
  z-index: 1;
  height: 1450px;
}

.event-group {
  background: none;
  border: 1px solid purple;
  height: 1450px;
}

.time-tile::after {
  content: '';
  width: calc(100% - 125px);
  left: 100px;
  height: 1px;
  background: green;
  position: absolute;
}

.time-span {
  height: 50px;
}

.time-span:nth-of-type(2n) .time-label {
  display: none;
}
</style>
