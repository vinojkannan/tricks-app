<template>
  <div class="text-center">
    <v-dialog :value="true" width="1000">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline" primary-title>
          <span v-if="viewMode">{{ title }}</span>
          <v-text-field
            label="Enter Title"
            v-model="title"
            v-else
          ></v-text-field>
        </v-card-title>
        <br v-if="viewMode" />
        <v-card-text v-if="viewMode">
          {{ decodeURIComponent(popupContent) }}
        </v-card-text>
        <v-textarea
          solo
          name="input-7-4"
          label="Enter the input"
          class="pa-5"
          auto-grow
          v-model="content"
          v-else
        ></v-textarea>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green text-right"
            text
            @click="setEditMode()"
            v-if="viewMode"
          >
            Edit
          </v-btn>
          <v-btn
            color="red text-right"
            text
            @click="deleteTrick(popupId)"
            v-if="viewMode"
          >
            Remove
          </v-btn>
          <v-btn
            color="green"
            text
            @click="editTrick(id, title, content)"
            v-if="editMode"
          >
            Save
          </v-btn>
          <v-btn
            color="green"
            text
            @click="addTrick(title, content)"
            v-if="createMode"
          >
            Add
          </v-btn>
          <v-btn color="primary" text @click="hidePopup()">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "TricksPopup",
  props: [
    "hidePopup",
    "trick",
    "deleteTrick",
    "editTrick",
    "addTrick",
    "popupMode"
  ],
  data() {
    return {
      id: this.trick.id,
      title: this.trick.title,
      content: this.trick.content,
      mode: this.popupMode
    };
  },
  mounted() {
    console.log("popup mounting");
  },
  methods: {
    setEditMode() {
      this.title = this.popupTitle;
      this.content = this.popupContent;
      this.mode = "edit";
    },
    saveTrick() {
      this.editTrick({
        id: this.trick.id,
        title: this.title,
        content: this.content
      });
    }
  },
  computed: {
    editMode() {
      return this.mode === "edit";
    },
    createMode() {
      return this.mode === "create";
    },
    viewMode() {
      return this.mode === "view";
    },
    popupTitle() {
      return this.trick && this.trick.title;
    },
    popupContent() {
      return this.trick && this.trick.content;
    },
    popupId() {
      return this.trick && this.trick.id;
    }
  }
};
</script>
