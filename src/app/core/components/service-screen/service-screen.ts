import { Component, inject } from '@angular/core';
import { ServiceItem } from '../../model/serviceItem';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TranslateService } from '../../service/translate-service';

@Component({
  selector: 'app-service-screen',
  imports: [MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './service-screen.html',
  styleUrl: './service-screen.scss',
})
export class ServiceScreen {
  public translateServ: TranslateService = inject(TranslateService);
  services: ServiceItem[] = [
    {
      icon: 'code',
      title: 'html.components.services.frontend.title',
      description:
        'html.components.services.frontend.desc',
      tech: ['Angular', 'TypeScript', 'RxJS'],
    },
    {
      icon: 'storage',
      title: 'html.components.services.fullstack.title',
      description:
        'html.components.services.fullstack.desc',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    },
    {
      icon: 'design_services',
      title: 'html.components.services.webDesign.title',
      description: 'html.components.services.webDesign.desc',
      tech: ['Figma', 'UI Kits', 'Wireframes'],
    },
    {
      icon: 'api',
      title: 'html.components.services.performance.title',
      description: 'html.components.services.performance.desc',
      tech: ['REST', 'OAuth2', 'Integrations'],
    },
    {
      icon: 'build_circle',
      title: 'html.components.services.graphicDesign.title',
      description: 'html.components.services.graphicDesign.desc',
      tech: ['Scripts', 'Dashboards', 'Automation'],
    },
    {
      icon: 'support',
      title: 'html.components.services.testing.title',
      description: 'html.components.services.testing.desc',
      tech: ['Refactoring', 'Debugging', 'Performance'],
    },
    {
      icon: 'support',
      title: 'html.components.services.ux.title',
      description: 'html.components.services.ux.desc',
      tech: ['Figma', 'Debugging', 'Performance'],
    },
    {
      icon: 'support',
      title: 'html.components.services.firebase.title',
      description: 'html.components.services.firebase.desc',
      tech: ['Firebase'],
    },
    {
      icon: 'support',
      title: 'Consulting & Maintenance',
      description: 'Mejora de código, optimizaciones de rendimiento y soporte continuo.',
      tech: ['Refactoring', 'Debugging', 'Performance'],
    },
  ];

  trackByService(index: number, item: ServiceItem) {
    return item.title;
  }

  
}
