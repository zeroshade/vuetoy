 <template>
   <div>
     <v-tabs v-model="tabs" color="cyan" dark slider-color="yellow">
       <v-tab ripple>
         Agenda
       </v-tab>
       <v-tab ripple>
         Room View
       </v-tab>
       <v-tab-item>
         <v-container style='position: relative'>
           <v-list one-line class='background-sched'>
             <template v-for="t in times">
               <v-list-tile tag='span' class='time-span' v-bind:style="{height: pixelHeight + 'px'}">
                 <v-list-tile-content class='time-tile'>
                   <v-list-tile-title class='time-label'>{{ t }}</v-list-tile-title>
                 </v-list-tile-content>
               </v-list-tile>
            </template>
          </v-list>
          <v-layout row justify-start align-baseline class='events'>
            <v-flex v-bind:style="{ height: height + 'px'}" v-bind="{ [`xs${12/dateRange.length}`]: true}" d-block mb-0 class='event-group' v-for='date in dateRange' :key='date.toString()'>
              <v-card flat tile class='top-info'>
                <v-card-title><span class='text-xs-center'>{{ date | moment().format('dddd') }}</span></v-card-title>
              </v-card>

              <div style='padding: 0px, height: 100%; position: relative;'>
                <template v-for='ev in eventsForDay(date)'>
                  <Event :pixelHeight='pixelHeight' :events='ev' :date='date' :key='ev[0].start.toString()' />
                </template>
              </div>

            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>
      <v-tab-item>

      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import colors from 'vuetify/es5/util/colors';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Event, { SchedEvent } from './Event.vue';

interface HeaderType {
  text: string;
  value: string;
  align: 'left' | 'center' | 'right';
  sortable: boolean;
  class?: string[] | string;
  width?: string;
}

@Component({
  components: {
    Event,
  },
})
export default class TimeTable extends Vue {
  public dialog: boolean = false;
  public pixelHeight: number = 50;
  public numHours: moment.Duration = moment.duration(14, 'hours');
  public height: number = this.pixelHeight * (this.numHours.asHours() * 2 + 1) + 1;
  public start: moment.Moment = moment('12:00', 'HH:mm');

  public get end(): moment.Moment {
    const end: moment.Moment = this.start.clone();
    end.add(this.numHours);
    return end;
  }

  public dayStart: Date = new Date(2018, 6, 27, 12);
  public dayEnd: Date = new Date(2018, 6, 28, 12);
  public tabs: number | null = null;

  public events: SchedEvent[] = [
    {
      start: moment(new Date('7/27/2018 6:00 PM')),
      duration: moment.duration(45, 'minutes'),
      desc: 'Set Up',
      room: 'game',
      viewing: false,
    },
    {
      start: moment(new Date('7/27/2018 10:00 PM')),
      duration: moment.duration(45, 'minutes'),
      desc: 'Ice Cream Social',
      room: 'play',
      viewing: false,
    },
    {
      start: moment(new Date('7/27/2018 10:00 PM')),
      duration: moment.duration(45, 'minutes'),
      desc: 'Astrology Meetup',
      room: 'social',
      viewing: false,
    },
    {
      start: moment(new Date('7/27/2018 7:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Welcome',
      room: 'game',
      viewing: false,
    },
    {
      start: moment(new Date('7/27/2018 11:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Clothing Optional Meetup',
      room: 'other',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 12:00 AM')),
      duration: moment.duration(45, 'm'),
      desc: 'Consentacle',
      room: 'game',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 12:00 AM')),
      duration: moment.duration(1.75, 'h'),
      desc: 'Wax Open Play',
      room: 'play',
      viewing: false,
    },
    {
      start: moment(new Date('7/27/2018 11:00 PM')),
      duration: moment.duration(2, 'h'),
      desc: 'Mead Tasting',
      room: 'social',
      viewing: false,
    },
    {
      start: moment(new Date('7/27/2018 8:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Playspace Intro and Etiquette',
      room: 'play',
      viewing: false,
    },
    {
      start: moment(new Date('7/27/2018 9:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'TOPPED! Giving people what they want',
      room: 'play',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 1:00 AM')),
      duration: moment.duration(1, 'h'),
      desc: 'Wren Runs a Thing!',
      room: 'game',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 12:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Community Scene, Eldritch Sacrifice',
      room: 'play',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 1:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Queerness & Public Faces Roundtable',
      room: 'play',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 12:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Ace Spectrum Meetup',
      room: 'social',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 1:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Beard Approval & Appreciation Meetup',
      room: 'social',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 2:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Snoop! A gift stealing game',
      room: 'game',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 2:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Being Better Men: Masc Roundtable',
      room: 'social',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 3:00 PM')),
      duration: moment.duration(1, 'h'),
      desc: 'Come Grill With Us!',
      room: 'other',
      viewing: false,
    },
    {
      start: moment(new Date('7/28/2018 3:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Pool Games!',
      room: 'other',
      viewing: false,
      icon: 'mdi-anchor',
    },
    {
      start: moment(new Date('7/28/2018 4:00 PM')),
      duration: moment.duration(45, 'm'),
      desc: 'Identity Insecurity Roundtable!',
      room: 'play',
      viewing: false,
    },
  ];

  public get eventsInOrder(): SchedEvent[][] {
    const res: SchedEvent[][] = [];
    let curr: SchedEvent[] = [];

    this.events.sort((a: SchedEvent, b: SchedEvent) => {
      if (a.start.isSame(b.start)) {
        return a.duration.asMinutes() - b.duration.asMinutes();
      }
      if (a.start.isBefore(b.start)) {
        return -1;
      }
      return 1;
    });

    let curEnd: moment.Moment | null = null;
    for (const current of this.events) {
      if (curr.length === 0) {
        curr.push(current);
        curEnd = curr[0].start.clone();
        curEnd.add(current.duration);
        continue;
      }

      if (current.start.isBetween(curr[0].start, curEnd as moment.Moment, undefined, '[]')) {
        curr.push(current);
        const cEnd = current.start.clone();
        cEnd.add(current.duration);
        if (cEnd.isAfter(curEnd as moment.Moment)) {
          curEnd = cEnd;
        }
        continue;
      }

      res.push(curr);
      curr = [current];
      curEnd = current.start.clone();
      curEnd.add(current.duration);
    }

    if (curr.length) {
      res.push(curr);
    }
    return res;
  }

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

  public eventsForDay(day: Date): SchedEvent[][] {
    const end = moment(day).add(this.numHours);
    return this.eventsInOrder.filter((ev: SchedEvent[]) => ev[0].start.isBetween(day, end, undefined, '[]'));
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

}

.time-span:nth-of-type(2n) .time-label {
  display: none;
}
</style>
