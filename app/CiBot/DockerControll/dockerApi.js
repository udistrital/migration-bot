const {
  Docker
} = require('node-docker-api');
const docker = new Docker({
  socketPath: '/var/run/docker.sock'
});
module.exports = {
  async getImage(image) {
    var contnrs = {}
    contnrs = await docker.image.get(image)
    //await docker.container.list()
      // Inspect
      //.then(containers => contnrs = containers)
      // .then(container => container.stats())
      // .then(stats => {
      //   stats.on('data', stat => console.log('Stats: ', stat.toString()))
      //   stats.on('error', err => console.log('Error: ', err))
      // })
      return contnrs
  },
  async listImages() {
    var contnrs = {}
    contnrs = await docker.image.list()
    //await docker.container.list()
      // Inspect
      //.then(containers => contnrs = containers)
      // .then(container => container.stats())
      // .then(stats => {
      //   stats.on('data', stat => console.log('Stats: ', stat.toString()))
      //   stats.on('error', err => console.log('Error: ', err))
      // })
      return contnrs
  },
  async listContainers(filter) {
    var containers = await docker.container.list({filters:filter})
    var resul = []
    for(var i = 0; i < containers.length;i++){
      var data = {}
      var aux = await containers[i].status()
      //console.log(aux);
      data.Image = aux.data.Name
      data.Status = aux.data.State.Status
      data.StartedAt = aux.data.State.StartedAt
      data.FinishedAt = aux.data.State.FinishedAt
      resul.push(data);
    }


      var status = resul
      return status
  },
  async imageExec(image,containerName,env,config){
    docker.events()
    var container = await docker.container.create({
      Image: image,
      name: containerName,
      Env: env,
      HostConfig: config

    }).then((container) => container.start())
  .catch((error) => console.log("container error ",error))
  return container
  },
  async conatinerEvents(containerName){
   var events = await docker.events({
      filters: {container: [containerName]}
  })
  return events
  }
}
