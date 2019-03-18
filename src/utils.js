export default {
    methods:{
        favorAlreadyExist(subject) {
            return this.$store.state.favors.some(function (v, i) {
                return v.id == subject.id
            })
        }
    }
}