import React from 'react'
import { Card } from './ui/card'
import { Building, Calculator, FileText } from 'lucide-react'

const UseCases = () => {
  return (
    <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-gray-900 mb-4">
              What Can You Ask?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From business registration to tax compliance, we&apos;ve got you
              covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-6 h-6 text-amber-600" />            
                <h3 className="font-heading font-semibold text-lg">
                  Business Registration
                </h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• How to register with CAC</li>
                <li>• Business name reservation</li>
                <li>• Required documents</li>
                <li>• Registration fees</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-amber-600" />
                <h3 className="font-heading font-semibold text-lg">
                  Tax Compliance
                </h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• VAT registration process</li>
                <li>• Income tax obligations</li>
                <li>• PAYE for employees</li>
                <li>• Tax filing deadlines</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-amber-600" />
                <h3 className="font-heading font-semibold text-lg">
                  Trade & Licensing
                </h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Import/export permits</li>
                <li>• Professional licenses</li>
                <li>• Industry regulations</li>
                <li>• Compliance requirements</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
  )
}

export default UseCases