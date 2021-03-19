'use strict'
 
const api = require("@opentelemetry/api")
const { NodeTracerProvider } = require('@opentelemetry/node')
const { BatchSpanProcessor } = require('@opentelemetry/tracing')
const { ZipkinExporter } = require('@opentelemetry/exporter-zipkin')
const { Resource, SERVICE_RESOURCE } = require('@opentelemetry/resources')
const os = require('os')
 
const SERVICE_NAME = 'burger-app'
const NR_TRACE_API_URL = 'https://trace-api.newrelic.com/trace/v1'
const NR_API_KEY = process.env.NEWRELIC_INSERT_KEY

const NR_ZIPKIN_HEADERS = {
 'X-License-Key': NR_API_KEY,
 'Data-Format': 'zipkin',
 'Data-Format-Version': '2',
}
 
const identifier = os.hostname()
const instanceResource = new Resource({
 [SERVICE_RESOURCE.INSTANCE_ID]: identifier,
 [SERVICE_RESOURCE.NAME]: SERVICE_NAME
})
 
const mergedResource = Resource.createTelemetrySDKResource().merge(instanceResource)
 
const traceProvider = new NodeTracerProvider({
 resource: mergedResource
})
 
traceProvider.addSpanProcessor(
 new BatchSpanProcessor(
   new ZipkinExporter({
     url: NR_TRACE_API_URL,
     headers: NR_ZIPKIN_HEADERS,
     logger: { debug: (...args) => console.log(...args) },
     statusCodeTagName: 'otel.status_code',
     statusDescriptionTagName: 'otel.status_description'
   })
 )
)
 
traceProvider.register()
 
const tracer = api.trace.getTracer('custom stuff')
 
module.exports = tracer
