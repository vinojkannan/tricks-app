<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="8" lg="8">
        <v-data-iterator
          :items="items"
          :items-per-page.sync="itemsPerPage"
          :page="page"
          :search="search"
          :sort-by="sortBy.toLowerCase()"
          :sort-desc="sortDesc"
          hide-default-footer
        >
          <template v-slot:header>
            <v-toolbar dark color="primary" class="mb-1">
              <v-text-field
                v-model="search"
                clearable
                flat
                solo-inverted
                class="black--text"
                hide-details
                prepend-inner-icon="search"
                label="Search"
              ></v-text-field>
              <v-spacer />
              <template v-if="$vuetify.breakpoint.mdAndUp">
                <!-- <v-select
                  v-model="sortBy"
                  flat
                  solo-inverted
                  hide-details
                  :items="keys"
                  prepend-inner-icon="search"
                  label="Sort by"
                ></v-select> -->
                <!-- <v-btn-toggle v-model="sortDesc" mandatory>
                  <v-btn large depressed color="primary" :value="false">
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                  <v-btn large depressed color="primary" :value="true">
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </v-btn-toggle> -->
              </template>
              <v-btn
                class="primary--text mx-2"
                color="white"
                @click="setCreateMode()"
              >
                Create
              </v-btn>
            </v-toolbar>
          </template>

          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="6"
                md="12"
                lg="12"
              >
                <v-card>
                  <v-card-title
                    class="subheading font-weight-bold"
                    @click="setViewMode(item)"
                  >
                    {{ item.title }}
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-list dense>
                    <v-list-item
                      v-for="(key, index) in filteredKeys"
                      :key="index"
                    >
                      <v-list-item-content
                        class="align-end"
                        :class="{ 'blue--text': sortBy === key }"
                        >{{
                          decodeURIComponent(item[key.toLowerCase()])
                        }}</v-list-item-content
                      >
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer>
            <v-row class="mt-2 mx-2" align="center" justify="center">
              <span class="grey--text">Items per page</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn dark text color="primary" class="ml-2" v-on="on">
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(number, index) in itemsPerPageArray"
                    :key="index"
                    @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-spacer></v-spacer>

              <span class="mr-4 grey--text"
                >Page {{ page }} of {{ numberOfPages }}</span
              >
              <v-btn fab dark color="primary" class="mr-1" @click="formerPage">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab dark color="primary" class="ml-1" @click="nextPage">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-iterator>
        <tricks-popup
          v-if="mode"
          :trick="selected"
          :hidePopup="hidePopup"
          :deleteTrick="deleteTrick"
          :editTrick="editTrick"
          :addTrick="addTrick"
          :popupMode="mode"
        ></tricks-popup>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as trickClient from "@/clients/Tricks";
import TricksPopup from "@/components/TricksPopup";

export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: "name",
      keys: ["Title", "Content"],
      items: [
        {
          title: "Frozen Yogurt",
          content: "super"
        },
        {
          title: "Ice cream sandwich",
          content: 237
        }
      ],
      selected: "",
      mode: ""
    };
  },
  components: {
    TricksPopup
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Title`);
    }
  },
  methods: {
    setViewMode(trick) {
      console.log("selecting", trick);
      this.selected = trick;
      this.mode = "view";
    },
    setCreateMode() {
      this.mode = "create";
    },
    hidePopup() {
      this.mode = "";
      this.selected = "";
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    addTrick(title, content) {
      trickClient.addTrick({ title, content }).then(() => {
        this.fetchAllTricks();
      });
    },
    editTrick(id, title, content) {
      trickClient.editTrick({ id, title, content }).then(() => {
        this.fetchAllTricks();
      });
    },
    deleteTrick(trickId) {
      trickClient.deleteTrick(trickId).then(() => {
        this.fetchAllTricks();
      });
    },
    fetchAllTricks() {
      trickClient.getTricks().then(res => {
        if (res.data) {
          this.items = res.data;
          this.hidePopup();
        }
      });
    }
  },
  mounted() {
    this.fetchAllTricks();
  }
};
</script>
