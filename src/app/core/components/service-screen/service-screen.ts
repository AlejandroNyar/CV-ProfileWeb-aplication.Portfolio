import { Component } from '@angular/core';
import { ServiceItem } from '../../model/serviceItem';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-service-screen',
  imports: [MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './service-screen.html',
  styleUrl: './service-screen.scss',
})
export class ServiceScreen {
  services: ServiceItem[] = [
    {
      icon: 'code',
      title: 'Frontend Development',
      description:
        'Aplicaciones modernas, rápidas y mantenibles con Angular, TypeScript y mejores prácticas.',
      tech: ['Angular', 'TypeScript', 'RxJS'],
    },
    {
      icon: 'storage',
      title: 'Backend Development',
      description:
        'APIs robustas, escalables y seguras usando Node.js, Express y bases de datos SQL/NoSQL.',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    },
    // {
    //   icon: 'design_services',
    //   title: 'UI / UX Prototyping',
    //   description: 'Experiencias intuitivas, centradas en el usuario, y diseño antes del código.',
    //   tech: ['Figma', 'UI Kits', 'Wireframes'],
    // },
    // {
    //   icon: 'api',
    //   title: 'API Integrations',
    //   description: 'Integraciones con servicios externos, autenticación y automatización.',
    //   tech: ['REST', 'OAuth2', 'Integrations'],
    // },
    // {
    //   icon: 'build_circle',
    //   title: 'Automation & Internal Tools',
    //   description: 'Herramientas personalizadas para aumentar productividad y reducir errores.',
    //   tech: ['Scripts', 'Dashboards', 'Automation'],
    // },
    // {
    //   icon: 'support',
    //   title: 'Consulting & Maintenance',
    //   description: 'Mejora de código, optimizaciones de rendimiento y soporte continuo.',
    //   tech: ['Refactoring', 'Debugging', 'Performance'],
    // },
  ];

  trackByService(index: number, item: ServiceItem) {
    return item.title;
  }

  
}
