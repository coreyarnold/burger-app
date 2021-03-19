'use strict'

const { LogLevel } = require('@opentelemetry/core')
const { NodeTracerProvider } = require('@opentelemetry/node')
const { SimpleSpanProcessor } = require('@opentelemetry/tracing')
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')
const { registerInstrumentations } = require('@opentelemetry/instrumentation')

const provider = new NodeTracerProvider({
  logLevel: LogLevel.ERROR
})

registerInstrumentations({
  tracerProvider: provider
})

provider.register()

provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new ZipkinExporter({
      serviceName: 'router'
      // If you are running your tracing backend on another host,
      // you can point to it using the `url` parameter of the
      // exporter config.
    })
  )
)

console.log('tracing initialized')