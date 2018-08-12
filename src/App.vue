<template>
  <v-app dark>
    <v-toolbar color="indigo" dark fixed app >
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu offset-y>
          <v-btn slot="activator" color="indigo" dark>
            Menu
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title>Foo</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <!-- <HelloWorld/> -->
      <TimeTable/>
    </v-content>
    <v-footer :fixed="fixed" dark app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import TimeTable from './components/TimeTable.vue';

@Component({
  components: {
    HelloWorld,
    TimeTable,
  },
})
export default class App extends Vue {
  public clipped: boolean = false;
  public drawer: boolean = true;
  public fixed: boolean = false;
  public items: Array<{ icon: string, title: string}> = [{
    icon: 'bubble_chart',
    title: 'Inspire',
  }];
  public miniVariant: boolean = false;
  public right: boolean = false;
  public rightDrawer: boolean = false;

  @Prop(String) private title?: string;
}
</script>
